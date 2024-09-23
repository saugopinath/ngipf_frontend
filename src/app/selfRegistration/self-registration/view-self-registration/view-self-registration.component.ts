import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-view-self-registration',
    templateUrl: './view-self-registration.component.html',
    styleUrls: ['./view-self-registration.component.scss'],
    imports: [TableModule, CommonModule, ButtonModule],
    standalone: true,
})
export class ViewSelfRegistrationComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
