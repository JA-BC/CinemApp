import { HttpErrorResponse } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { EServiceState, IUser } from "../interfaces/services.model";
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AppInjector } from "@core/helpers/injector";

export class AuthService {

  protected readonly _onState$ = new Subject<EServiceState>();
  protected readonly _onError$ = new Subject<Error | HttpErrorResponse>();

  protected readonly router: Router = AppInjector.getInstance(Router);

  readonly onError: Observable<Error | HttpErrorResponse> = this._onError$.asObservable();
  readonly SERVICE_STATE = EServiceState;
  readonly rootUrl: string = '/app';
  readonly loginUrl: string = '/auth/login';

  state: EServiceState = EServiceState.Browse;

  get loading() {
    return this.state === this.SERVICE_STATE.Load;
  } 

  model: Partial<IUser> = { };
  returnUrl: string;
  isAuthenticated: boolean = false;


  constructor(
    protected readonly fireauth: AngularFireAuth
  ) {
      this.fireauth.authState.pipe(first()).subscribe(user => {
          if (user) {
            this.isAuthenticated = true;
          } else {
            this.isAuthenticated = false;
          }
      })
  }

  async login(model?: IUser) {
    try {
      this.onStateChange(EServiceState.Load);
      const item = Object.assign({}, this.model, model);
      const res = await this.fireauth.signInWithEmailAndPassword(item.email, item.password);
      
      if (this.returnUrl) {
        this.router.navigate([this.returnUrl]);
      } else {
        this.router.navigate([this.rootUrl]);
      }
        
      this.isAuthenticated = true;
      return res;
    } catch (e) {
      this._onError$.next(e);
    } finally {
      this.onStateChange(EServiceState.Browse);
    }
  }

  async register(model?: IUser) {
    try {
      this.onStateChange(EServiceState.Load);
      const item = Object.assign(this.model, model);
      const res = await this.fireauth.createUserWithEmailAndPassword(item.email, item.password);

      this.router.navigate([this.loginUrl]);
      return res;
    } catch (e) {
      this._onError$.next(e);
    } finally {
      this.onStateChange(EServiceState.Browse);
    }
  }

  onStateChange(state: EServiceState) {
    if (state === this.state) {
        return;
    }

    this._onState$.next(state);
    this.state = state;
  }

  async logout() {
    await this.fireauth.signOut();
    this.isAuthenticated = false;
  }

}
