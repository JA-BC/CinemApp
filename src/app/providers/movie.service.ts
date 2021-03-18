
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '@core/class/base.service';
import { IMovie } from '../models/movie.model';

@Injectable({providedIn: 'root'})
export class MovieService extends FirebaseService<IMovie> {
    
    constructor(
        public readonly firestore: AngularFirestore
    ) {
        super('movies', firestore);
    }
    
}
