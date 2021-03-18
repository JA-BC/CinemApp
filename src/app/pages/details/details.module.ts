import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details.component';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: DetailsComponent,
    }
];

@NgModule({
    declarations: [DetailsComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class DetailsModule { }
