import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-permission-of-initiation',
  templateUrl: './permission-of-initiation.component.html',
  styleUrls: ['./permission-of-initiation.component.scss']
})
export class PermissionOfInitiationComponent implements OnInit {

  PermissionForm!: FormGroup;
  showTreasury: boolean = true;
  showHeadOfAccount: boolean = true;
  showTable: boolean = false;  // Flag to control table visibility
  value: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.PermissionForm.get('Search_By')?.valueChanges.subscribe(value => {
      this.toggleFieldsVisibility(value);
    });
  }

  initializeForm(): void {
    this.PermissionForm = this.fb.group({
      Search_By: ['', Validators.required],
      Treasury: [''],
      Head_Of_Account: [''],
    });
  }

  toggleFieldsVisibility(value: string): void {
    if (value === 'option1') {
      this.showTreasury = true;
      this.showHeadOfAccount = false;
      this.PermissionForm.get('Treasury')?.setValidators(Validators.required);
      this.PermissionForm.get('Head_Of_Account')?.clearValidators();
    } else if (value === 'option2') {
      this.showTreasury = false;
      this.showHeadOfAccount = true;
      this.PermissionForm.get('Treasury')?.clearValidators();
      this.PermissionForm.get('Head_Of_Account')?.setValidators(Validators.required);
    } else {
      this.showTreasury = true;
      this.showHeadOfAccount = true;
      this.PermissionForm.get('Treasury')?.setValidators(Validators.required);
      this.PermissionForm.get('Head_Of_Account')?.setValidators(Validators.required);
    }
    this.PermissionForm.get('Treasury')?.updateValueAndValidity();
    this.PermissionForm.get('Head_Of_Account')?.updateValueAndValidity();
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.PermissionForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  // Method to reset the form
  resetForm(): void {
    this.PermissionForm.reset();
    this.showTreasury = true;
    this.showHeadOfAccount = true;
    this.showTable = false;  // Reset table visibility
  }

  // Method to handle the search button click
  onSearch(): void {
    if (this.PermissionForm.valid) {
      this.showTable = true;  // Show the table when the form is valid and search button is clicked
    } else {
      this.showTable = false; // Hide the table if form is invalid
      Object.keys(this.PermissionForm.controls).forEach(field => {
        const control = this.PermissionForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }
}
