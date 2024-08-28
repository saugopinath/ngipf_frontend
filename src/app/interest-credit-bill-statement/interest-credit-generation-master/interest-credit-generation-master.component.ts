import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-interest-credit-generation-master',
  templateUrl: './interest-credit-generation-master.component.html',
  styleUrls: ['./interest-credit-generation-master.component.scss']
})
export class InterestCreditGenerationMasterComponent implements OnInit {

  FinalPaymentMasterForm!: FormGroup;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.FinalPaymentMasterForm = this.fb.group({
      Head_of_Account: ['', Validators.required],
      Treasury: ['', Validators.required],
      NGIPF_Administrator: ['', Validators.required],
      
      
    });
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.FinalPaymentMasterForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
