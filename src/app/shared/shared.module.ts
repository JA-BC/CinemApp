import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputWrapperComponent } from './components/input-wrapper/input-wrapper.component';
import { CardFoodComponent } from './templates/card-food/card-food.component';
import { MovieTicketComponent } from './templates/movie-ticket/movie-ticket.component';

@NgModule({
    declarations: [
        MovieTicketComponent,
        CardFoodComponent,
        InputWrapperComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule.forRoot()
    ],
    exports: [
        IonicModule,
        FormsModule,
        MovieTicketComponent,
        CardFoodComponent,
        InputWrapperComponent
    ],
    providers: [],
})
export class SharedModule { }
