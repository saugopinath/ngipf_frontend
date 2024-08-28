import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
interface FinancialYear {
    year: string,
    code: string 
}
interface TransactionType{
    name:string,
    code:string
}
@Component({
    selector: 'app-tagging-receipt-payment',
    templateUrl: './tagging-receipt-payment.component.html',
    styleUrls: ['./tagging-receipt-payment.component.scss'],
})

export class TaggingReceiptPaymentComponent implements OnInit {
    taggingReceiptPayement!: FormGroup;
    maxDateValue: Date = new Date(Date.now());
    dropdownItemFinancialYear: FinancialYear[];
    dropdownItemTransactionType:TransactionType[];
    constructor(private fb: FormBuilder) 
    {
        this.dropdownItemFinancialYear= [
            { year: '2022-2023',code:'2022-2023'},
            { year: '2023-2024',code:'2023-2024'},
            {year:'2024-2025',code:'2024-2025'}
        ];
        this.dropdownItemTransactionType=[
            {name:'Payment',code:'payment'},
            {name:'Receipt',code:'receipt'},
        ]
    }

    ngOnInit(): void {
        this.initializeForm();
    }
    initializeForm(): void {
        this.taggingReceiptPayement = this.fb.group({
            treasuryName: ['', Validators.required],
            operatorDesc: ['', Validators.required],
            GONo: ['', Validators.required],
            selectedItemFinancialYear: [Validators.required],
            selectedFromDate: [Validators.required],
            selectedToDate: [Validators.required],
            // selectedItemRefType:[Validators.required],
            selectedItemTransactionType:[Validators.required],
        });
    }
    isInvalidAndTouched(controlName: any): boolean {
        const control = this.taggingReceiptPayement.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }
}
