import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { RegisterComponent } from './register.component';

const routes: Routes = [
    {
        path: '',
        component: RegisterComponent,
    }
];

@NgModule({
    declarations: [RegisterComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [],
    providers: [],
})
export class RegisterModule { }