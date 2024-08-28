import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-contact-details',
    templateUrl: './contact-details.component.html',
    styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit {
    addContact!: FormGroup;
    checked: boolean = false;
    submitted: boolean = false;
    maxDateValue: Date = new Date(Date.now());
    
    constructor(private fb: FormBuilder, private router: Router) {}

    ngOnInit(): void {
      this.initializeForm()
    }
    initializeForm(): void {
        this.addContact = this.fb.group({
            mobileno: [''],
            emailId: [''],
            line1: [''],
            line2: [''],
            state: [''],
            district: [''],
            pinCode: [''],
            selectedAED: [null, Validators.required],
            checked: [''],
        });
    }
    isInvalidAndTouched(controlName: string): boolean {
        const control = this.addContact.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }
    prevPage(){
      this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Basic-details']);
    }
    nextPage() {
      this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Salary']);
      this.submitted = true;
    }
}
