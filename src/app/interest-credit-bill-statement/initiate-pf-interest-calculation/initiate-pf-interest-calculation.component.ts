import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface Year{
  Year: String;
  code: string;
} 

@Component({
  selector: 'app-initiate-pf-interest-calculation',
  templateUrl: './initiate-pf-interest-calculation.component.html',
  styleUrls: ['./initiate-pf-interest-calculation.component.scss']
})
export class InitiatePfInterestCalculationComponent implements OnInit {
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

