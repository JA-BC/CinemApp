import { Component, OnInit } from '@angular/core';
import { INPUT_PATTERNS } from '@core/constants';
import { IUser } from '@core/interfaces/services.model';
import { AccountService } from '@providers/account.service';

@Component({
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    model: Partial<IUser> = {};
    PATTERNS = INPUT_PATTERNS;

    constructor(
        public readonly service: AccountService
    ) { }

    ngOnInit() {}
}
