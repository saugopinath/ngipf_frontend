import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
    selector: 'app-add-interest-rate',
    templateUrl: './add-interest-rate.component.html',
    styleUrls: ['./add-interest-rate.component.scss'],
})
export class AddInterestRateComponent implements OnInit {
    addInterestRate!: FormGroup;
    maxDateValue: Date = new Date(Date.now());

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }
    initializeForm(): void {
        this.addInterestRate = this.fb.group({
            InterestRate: ['', Validators.required],
            active: ['', Validators.required],
            GONo: ['', Validators.required],
            GODate: ['', Validators.required],
            selectedGODate: [null, Validators.required],
            selectedWEFDate: [null, Validators.required],
            selectedWETDate: [null, Validators.required],
        });
    }

    // Method to check if a form control is invalid and touched
    isInvalidAndTouched(controlName: string): boolean {
        const control = this.addInterestRate.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }
}
