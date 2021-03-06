import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DestroyService extends Observable<void> implements OnDestroy {

    private readonly life$ = new Subject<void>();

    constructor() {
        super(subs => this.life$.subscribe(() => subs));
    }

    ngOnDestroy() {
        this.life$.next();
        this.life$.complete();
    }
    
}