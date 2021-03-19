import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MovieService } from '@providers/movie.service';
import { SnackService } from '@providers/snack.service';
import { TicketService } from '@providers/ticket.service';
import { AccountService } from '@providers/account.service';
import { IMovie } from 'src/app/models/movie.model';

@Component({
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

    constructor(
        public readonly snackService: SnackService,
        public readonly movieService: MovieService,
        public readonly ticketService: TicketService,
        public readonly accountService: AccountService,
        public readonly router: Router,
        public readonly alert: AlertController
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

        this.ticketService.model = {
            movie,
            order,
            count: 1,
            paymentMethod: 'Tarjeta'
        };

        this.router.navigate(['/app/details']);
    }

    async notImplemented() {
        const alert = await this.alert.create({
            header: 'Action',
            message: 'Action not implemented yet',
            buttons: ['OK']
        });

        return await alert.present();
    }

    async logout() {
        const alert = await this.alert.create({
            header: 'Cerrar Sesion',
            message: '¿Estas seguro?',
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel'
                },
                {
                    text: 'Aceptar',
                    handler: () => this.accountService.logout()
                }
            ]
        });

        return await alert.present();
    }

}
