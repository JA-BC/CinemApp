import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EServiceState } from '@core/interfaces/services.model';
import { TicketService } from '@providers/ticket.service';
import { ITicket } from 'src/app/models/ticket.model';

@Component({
    templateUrl: './ticket.component.html'
})
export class TicketComponent implements OnInit {

    constructor(
        public readonly ticketService: TicketService,
        public readonly router: Router
    ) { }

    ngOnInit() {
        this.ticketService.load();
    }

    onSelectTicket(ticket: ITicket) {
        this.ticketService.isCancelable = true;
        this.ticketService.model = ticket;
        this.router.navigate(['/app/details']);
    }

}
