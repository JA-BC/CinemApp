import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from '@core/interfaces/services.model';
import { clearForm } from '@core/utils/functions';
import { AccountService } from '@providers/account.service';
import { ActivatedRoute } from '@angular/router';
import { INPUT_PATTERNS } from '@core/constants';

@Component({
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    @ViewChild('form', { static: true }) form: NgForm;
    model: Partial<IUser> = {};
    PATTERNS = INPUT_PATTERNS;

    constructor(
        public readonly service: AccountService,
        public readonly route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.service.returnUrl = this.route.snapshot.queryParams['returnUrl'];
    }

    ionViewDidLeave() {
        clearForm(this.form);
    }

}
