import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
    selector: 'app-insert',
    templateUrl: './insert.component.html',
    styleUrls: ['./insert.component.scss'],
    imports: [ReactiveFormsModule,CommonModule,ButtonModule ,InputTextModule],
    standalone: true,
})
export class InsertComponent implements OnInit {
    insertTreasuryBank!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit(): void {
        this.initializeForm();
    }

    initializeForm(): void {
        this.insertTreasuryBank = this.fb.group({
            TagEmployees: ['', Validators.required],
            MajorHead: ['', Validators.required],
            financial_year: ['', Validators.required],
            PreChallanId: ['', Validators.required],
            Treasury_Challan_Id: ['', Validators.required],
            Treasury_Challan_Amount: [null, Validators.required],
            Salary_year: [null, Validators.required],
            Salary_month: ['', Validators.required],
            operator_name: ['', Validators.required],
            treasury_name: ['', Validators.required],
            Bank_Name: [null, Validators.required],
            Total_Amount: [null, Validators.required],
            Status: [null, Validators.required],
            Request_Id: [null, Validators.required],
        });
    }

    isInvalidAndTouched(controlName: string): boolean {
        const control = this.insertTreasuryBank.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }
}
