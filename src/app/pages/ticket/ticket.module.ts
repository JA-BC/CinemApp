import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketComponent } from './ticket.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: TicketComponent,
    }
];

@NgModule({
    declarations: [TicketComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class TicketModule { }
