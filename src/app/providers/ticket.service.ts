import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '@core/class/base.service';
import { ITicket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService extends FirebaseService<ITicket> {

    constructor(
        public readonly firestore: AngularFirestore
    ) {
        super('tickets', firestore)
    }
}
