import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



interface Year{
  Year: String;
  code: string;
}  

@Component({
  selector: 'app-interest-credit-bill-summary',
  templateUrl: './interest-credit-bill-summary.component.html',
  styleUrls: ['./interest-credit-bill-summary.component.scss']
})
export class InterestCreditBillSummaryComponent implements OnInit {

  dropdownItemYearType: Year[];
  
  PFInterestForm !: FormGroup;

  constructor(private fb: FormBuilder) {
    this.dropdownItemYearType = [
      { Year: '2022-2023', code: '2022-2023' },
      { Year: '2023-2024', code: '2023-2024' },
     
    ]; 
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.PFInterestForm = this.fb.group({
      Financial_Year: ['', Validators.required],
      
     
    });
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.PFInterestForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }


}


