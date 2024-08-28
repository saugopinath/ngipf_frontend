import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Year{
  Year: String;
  code: string;
}

@Component({
  selector: 'app-tr-for-final-payment',
  templateUrl: './tr-for-final-payment.component.html',
  styleUrls: ['./tr-for-final-payment.component.scss']
})
export class TRForFinalPaymentComponent implements OnInit {

  dropdownItemYearType: Year[];
  
  FinalPaymentForm!: FormGroup;
  

  constructor(private fb: FormBuilder) {
    this.dropdownItemYearType = [
      { Year: '2022-2023', code: '2022-2023' },
      { Year: '2023-2024', code: '2023-2024' },
      { Year: '2024-2025', code: '2024-2025' },
    ];

   
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.FinalPaymentForm = this.fb.group({
      Head_of_Account: ['', Validators.required],
      Financial_Year: ['', Validators.required],
      Financial_Month: ['', Validators.required],
      
      
    });
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.FinalPaymentForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}


// call the add/create service here.
