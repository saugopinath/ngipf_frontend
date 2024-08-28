import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-final-payment-eligibility-master',
  templateUrl: './final-payment-eligibility-master.component.html',
  styleUrls: ['./final-payment-eligibility-master.component.scss']
})
export class FinalPaymentEligibilityMasterComponent implements OnInit {

  MasterForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.MasterForm = this.fb.group({
      Head_of_Account: ['', Validators.required],
      Treasury: ['', Validators.required],
      PFD_Admin: ['', Validators.required],
      
    });
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.MasterForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }


}


