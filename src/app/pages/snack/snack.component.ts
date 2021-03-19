import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SnackService } from '@providers/snack.service';
import { SLIDEUP_ANIMATION } from '@shared/utils/animations';

@Component({
    selector: 'ion-snack',
    templateUrl: './snack.component.html',
    animations: [SLIDEUP_ANIMATION]
})
export class SnackComponent implements OnInit {

    snacks: any[] = [
        { name: 'Hot Dog', price: 100 },
        { name: 'Palomitas', price: 250 }
    ];

    constructor(
        public readonly service: SnackService
    ) { }

    ngOnInit(): void { }

}
