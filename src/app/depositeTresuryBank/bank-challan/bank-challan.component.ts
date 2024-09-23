import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bank-challan',
  templateUrl: './bank-challan.component.html',
  styleUrls: ['./bank-challan.component.scss']
})
export class BankChallanComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  bankChallan!: FormGroup;
  maxDateValue: Date = new Date(Date.now());


  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.bankChallan = this.fb.group({
        
        selectedFromDate: [Validators.required],
        selectedToDate: [Validators.required],
        requestId: ['', Validators.required],
    });
  }

  isInvalidAndTouched(controlName: any): boolean {
    const control = this.bankChallan.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
