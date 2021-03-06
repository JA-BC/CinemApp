import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestroyService } from '@core/class/destroy.service';
import { EServiceState } from '@core/interfaces/services.model';
import { clearForm } from '@core/utils/functions';
import { AccountService } from '@providers/account.service';
import { TicketService } from '@providers/ticket.service';
import { SnackService } from '@providers/snack.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './details.component.html',
    providers: [DestroyService]
})
export class DetailsComponent implements OnInit, OnDestroy {

    @ViewChild('form', { static: true }) form: NgForm;
    payment = ['Tarjeta', 'Otro'];

    constructor(
        private readonly accountService: AccountService,
        private readonly snackService: SnackService,
        private readonly destroy$: DestroyService,
        private readonly router: Router,
        public readonly ticketService: TicketService
    ) { }

    ngOnInit() {
        // if for some reason navigate by URL
        if (!this.ticketService.model?.movie) {
            this.router.navigate(['/app']);
        }

        // when a ticket is deleted ('canceled') if everything go well, go to ticket page
        this.ticketService.onDeleted.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.router.navigate(['/app/tickets']);
        });

        // when a ticket is added if everything go well, go to home page
        this.ticketService.onAdded.pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.snackService.entities = []; // clean snacks
            this.router.navigate(['/app/tickets']);
        });
    }

    // Add a ticket to ticket's list
    onDoPayment() {
        this.ticketService.add();
    }

    goToLogin() {
        const returnUrl = this.router.routerState.snapshot.url;
        this.router.navigate(['/auth/login'], {
            queryParams: {
                returnUrl
            }
        })
    }

    // delete one ticket from ticket's list
    onCancelTicket() {
        this.ticketService.delete();
    }

    get subtotal(): number {
        try {
            let total = 0;
            this.ticketService.model.order.forEach(item => {
                total += item?.price;
            });

            return total;
        } catch {
            return 0;
        }
    }

    ngOnDestroy() {
        clearForm(this.form);
        this.ticketService.isCancelable = false;
    }

}
