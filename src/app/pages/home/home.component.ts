import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '@providers/movie.service';
import { SnackService } from '@providers/snack.service';
import { TicketService } from '@providers/ticket.service';
import { IMovie } from 'src/app/models/movie.model';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(
        public readonly snackService: SnackService,
        public readonly movieService: MovieService,
        public readonly ticketService: TicketService,
        public readonly router: Router
    ) { }

    ngOnInit() {
        this.movieService.load();
    }

    onSelectMovie(movie: IMovie) {
        const order = this.snackService.entities.map(value => {
            const { name, price } = value;
            return { name, price };
        });

        order.unshift({ name: movie.name, price: movie.price });

        this.ticketService.model = { movie, order };

        this.router.navigate(['/app/details']);
    }

}
