import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface Year{
  Year: String;
  code: string;
}
interface Name{
  Name: String;
  code: string;
}

@Component({
  selector: 'app-transfer-history',
  templateUrl: './transfer-history.component.html',
  styleUrls: ['./transfer-history.component.scss']
})
export class TransferHistoryComponent implements OnInit {

  dropdownItemYearType: Year[];
  
  transferhistoryForm!: FormGroup;
  dropdownItemSearchType :Name[];
  

  constructor(private fb: FormBuilder) {
    this.dropdownItemYearType = [
      { Year: '2022-2023', code: '2022-2023' },
      { Year: '2023-2024', code: '2023-2024' },
      { Year: '2024-2025', code: '2024-2025' },
    ];

    this.dropdownItemSearchType = [
      { Name: 'Status', code: 'status' },
      { Name: 'NGIPF Account No.', code: 'NGIPF Account No.' },
      { Name: 'Subscriber Name', code: 'Subscriber Name' },
    ];
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.transferhistoryForm = this.fb.group({
      Head_of_Account: ['', Validators.required],
      PFDAdmin: ['', Validators.required],
      PF_Acc_No: ['', Validators.required],
      Financial_Year: ['', Validators.required],
      Status: ['', Validators.required],
      Treasury: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Assuming EmployeeId is a numeric value
      Sanction_Admin: ['', Validators.required],
      Search_By: ['', Validators.required],
      
    });
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.transferhistoryForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}


// call the add/create service here.