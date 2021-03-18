import { EServiceState, IEntity } from "@core/interfaces/services.model";
import { Observable, Subject } from "rxjs";
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { map } from 'rxjs/operators';

/**
 * Firebase class to implements intial logic for service using firebase
 * take two arguments `collectionName` and `firestore` this last is an AngularFirestore Service
 */
export class FirebaseService<TModel extends IEntity<string>> {

    protected readonly _onState$ = new Subject<EServiceState>();
    protected readonly _onError$ = new Subject<Error | HttpErrorResponse>();

    readonly onError: Observable<Error | HttpErrorResponse> = this._onError$.asObservable();
    readonly SERVICE_STATE = EServiceState;

    state: EServiceState = EServiceState.Browse;

    get loading() {
        return this.state === this.SERVICE_STATE.Load;
    }

    get editing() {
        return this.state === this.SERVICE_STATE.Update;
    }

    onAdded = new Subject<TModel>();
    onDeleted = new Subject<TModel>();
    onLoaded = new Subject<Observable<TModel[]>>();

    model: Partial<TModel> = { };
    entities: Observable<TModel[]>;
    collection: AngularFirestoreCollection;

    constructor(
        protected readonly collectionName: string,
        protected readonly firestore: AngularFirestore
    ) { }

    async add(model?: TModel): Promise<TModel> {
        try {
            this.onStateChange(EServiceState.Load);
            const item: TModel = Object.assign({}, this.model, model);
            console.log(item);
            this.collection.add(item);
            this.onAdded.next(item);
            return item;
        } catch(e) {
            this._onError$.next(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }

    async load() {
        try {
            this.onStateChange(EServiceState.Load);
            this.collection = this.firestore.collection<TModel>(this.collectionName);
            this.entities = this.collection.snapshotChanges().pipe(
                map(actions => actions.map(a => {
                    const data = a.payload.doc.data() as TModel;
                    data.id = a.payload.doc.id;
                    return data;
                }))
            );
            
            this.onLoaded.next(this.entities);
            return this.entities;
        } catch(e) {
            this._onError$.next(e);
        } finally {
            this.onStateChange(EServiceState.Browse);
        }
    }

    async delete(model?: TModel) {
        try {
            this.onStateChange(EServiceState.Load);
            const item = Object.assign({}, this.model, model);
            const doc = this.firestore.doc(`${this.collectionName}/${item.id}`);
            await doc.delete();
            this.onDeleted.next(model);
            return model;
        } catch(e) {
            this._onError$.next(e);
        } finally {
            this.onStateChange(EServiceState.Update);
        }
    }

    onStateChange(state: EServiceState) {
        if (state === this.state) {
            return;
        }

        this._onState$.next(state);
        this.state = state;
    }

}

