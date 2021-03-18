import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ion-movie-ticket',
    templateUrl: './movie-ticket.component.html'
})
export class MovieTicketComponent implements OnInit {

    @Input() name: string;

    @Input() schedule: string;

    constructor() { }

    ngOnInit() { }
}
