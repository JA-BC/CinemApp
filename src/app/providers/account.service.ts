import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/class/auth.service';

@Injectable({ providedIn: 'root' })
export class AccountService extends AuthService {
    
    constructor(
        public readonly fireauth: AngularFireAuth
    ) {
        super(fireauth);
    }
    
}
