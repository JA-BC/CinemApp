import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'ion-card-food',
    templateUrl: './card-food.component.html'
})
export class CardFoodComponent implements OnInit {

    @Input() title: string;

    @Input() imgURL: string;

    constructor() { }

    ngOnInit() { }
}
