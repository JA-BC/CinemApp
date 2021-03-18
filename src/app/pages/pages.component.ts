import { Component, OnInit } from '@angular/core';
import { SnackService } from '@providers/snack.service';

@Component({
    templateUrl: './pages.component.html'
})
export class PagesComponent implements OnInit {
    
    constructor(
        public readonly snackService: SnackService
    ) { }

    ngOnInit() { }
}
