import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { PagesComponent } from './pages.component';
import { SnackComponent } from './snack/snack.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'tickets',
                loadChildren: () => import('./ticket/ticket.module').then(m => m.TicketModule)
            }
        ]
    },
    {
        path: 'details',
        loadChildren: () => import('./details/details.module').then(m => m.DetailsModule)
    }
];

@NgModule({
    declarations: [
        PagesComponent,
        SnackComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class PagesModule { }
