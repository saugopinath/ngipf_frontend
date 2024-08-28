/* eslint-disable @angular-eslint/no-output-on-prefix */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @angular-eslint/component-selector */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

/************************************************************************************************************************
 *******************************    Ths is wrapper Component for all Service Providers    *******************************
 ************************************************************************************************************************/

@Component({
    selector: 'ServiceProviderWarpper',
    templateUrl: './ServiceProviderWarpper.component.html',
    styleUrls: ['./ServiceProviderWarpper.component.scss']
})
export class ServiceProviderWarpperComponent implements OnInit {
    @Input() parentFormName: FormGroup;
    @Output() onServiceProviderAdd = new EventEmitter<any>();

    electricityServiceIds: number[] = [3, 4]
    bsnlServiceIds: number[] = [1, 2]

    constructor() { }

    ngOnInit() {
    }
    onServiceProviderEntry($event: any) {
        this.onServiceProviderAdd.emit($event);
    }

}
