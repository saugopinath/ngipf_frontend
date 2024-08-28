import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../../services/validation.service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'smart-error',
    templateUrl: './smart-error.component.html',
    styleUrls: ['./smart-error.component.scss'],
})
export class SmartErrorComponent {

    @Input() control!: AbstractControl;

    constructor(private validationService: ValidationService) { }

    get errorMessage(): any {
        for (const propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName)) {
                return this.validationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
            }
        }
        return null;
    }
}
