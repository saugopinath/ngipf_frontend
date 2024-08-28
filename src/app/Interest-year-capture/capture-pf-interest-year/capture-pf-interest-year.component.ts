import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { convertDate } from 'src/app/utils/dateConversion';
import { ToastService } from 'src/app/core/services/toast.service';
import { CapturePFInterestYearService } from 'src/app/core/services/CapturePFInterestYearDetails/capture-pfinterest-year.service';




interface Status {
  name: string;
  code: string;
}
interface HOA {
  hoaName: string;
  hoaCode: string;
}
interface Treasury {
  trName: string;
  trCode: string;
}

@Component({
  selector: 'app-capture-pf-interest-year',
  templateUrl: './capture-pf-interest-year.component.html',
  styleUrls: ['./capture-pf-interest-year.component.scss'],
})
export class CapturePfInterestYearComponent implements OnInit {
  capturePfInterestYearForm!: FormGroup;

  showTreasury: boolean = true;
  showHeadOfAccount: boolean = true;
  dropdownItemStatusType: Status[];
  value: boolean;
  showTable: boolean = false;
  capturePfInterestYear: any[] = [];
  dropdownItemTreasuryname: Treasury[] = [];
  dropdownItemHeadOfAccount: HOA[] = [];
  displayDetails: boolean = false;
  displayApprovalDialog: boolean = false;
  selectedCapturePfInterestYear: any;
  isVerifiedAndChecked: boolean = false;
  selectedCheckbox: number | null = null;

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,private CapturePFInterestYearService :CapturePFInterestYearService ) {
    this.dropdownItemStatusType = [
      { name: 'Approved', code: 'Approved' },
      { name: 'All', code: 'All' },
      { name: 'Initiated', code: 'Initiated' },
      { name: 'Unapproved', code: 'Unapproved' },
    ];
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getTresury();
    this.getHOA();
    this.capturePfInterestYearForm.get('Search_By')?.valueChanges.subscribe((value) => {
      this.toggleFieldsVisibility(value);
    });
  }

  initializeForm(): void {
    this.capturePfInterestYearForm = this.fb.group({
      DebitHeadOfAccount: ['', Validators.required],
      HeadOfAccount: [''],
      OperatorName: ['', Validators.required],
      Search_By: ['', Validators.required],
      Treasury: [''],
      Status: ['', Validators.required],
    });
  }

  toggleFieldsVisibility(value: string): void {
    if (value === 'option1') {
      this.showTreasury = true;
      this.showHeadOfAccount = true;
      this.capturePfInterestYearForm.get('Treasury')?.setValidators(Validators.required);
      this.capturePfInterestYearForm.get('HeadOfAccount')?.setValidators(Validators.required);
    } else if (value === 'option2') {
      this.showTreasury = false;
      this.showHeadOfAccount = true;
      this.capturePfInterestYearForm.get('Treasury')?.clearValidators();
      this.capturePfInterestYearForm.get('HeadOfAccount')?.setValidators(Validators.required);
    } else if (value === 'option3') {
      this.showTreasury = true;
      this.showHeadOfAccount = false;
      this.capturePfInterestYearForm.get('Treasury')?.setValidators(Validators.required);
      this.capturePfInterestYearForm.get('HeadOfAccount')?.clearValidators();
    }
    this.capturePfInterestYearForm.get('Treasury')?.updateValueAndValidity();
    this.capturePfInterestYearForm.get('HeadOfAccount')?.updateValueAndValidity();
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.capturePfInterestYearForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

  resetForm(): void {
    this.capturePfInterestYearForm.reset();
    this.showTreasury = true;
    this.showHeadOfAccount = true;
  }

  onSearch() {
    if (this.capturePfInterestYearForm.valid) {
      this.showTable = true;
    this.getCapturePFInterestYear();
    } else {
      this.showTable = false;
      Object.keys(this.capturePfInterestYearForm.controls).forEach((field) => {
        const control = this.capturePfInterestYearForm.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
    }
  }

  getTresury() {
    this.CapturePFInterestYearService.getTresury().subscribe((response) => {
      console.log({ response });
      if (response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
        response.result.map((item) => {
          item.trName = item.trName + ' (' + item.trCode + ')';
        });
        this.dropdownItemTreasuryname = response.result;
      }
    });
  }

  getHOA() {
    this.CapturePFInterestYearService.getHOA().subscribe((response) => {
      console.log({ response });
      if (response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
        response.result.map((item) => {
          item.hoaName = item.hoaName + ' (' + item.hoaCode + ')';
        });
        this.dropdownItemHeadOfAccount = response.result;
      }
    });
  }

  getCapturePFInterestYear(){
    this.CapturePFInterestYearService.capturePFInterest().subscribe((response) => {
      //console.log(response);
      if (response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
          response.result.map((item: any) => {
              
              item.interestYearUpto = convertDate(item.interestYearUpto);
              
          });
          this.capturePfInterestYear = response.result;
      } else {
          this.toastService.showAlert(response.message, response.apiResponseStatus);
      }
  });
  }
  showDetailsDialog(capturePfInterestYear: any) {
    this.selectedCapturePfInterestYear = capturePfInterestYear;
    this.displayDetails = true;
  }
  showApprovalDialog() {
    this.displayApprovalDialog = true;
  }
  isApproveDisabled(): boolean {
    return this.selectedCheckbox === null;
  }


  confirmApproval() {
    if (this.isVerifiedAndChecked) {
      this.toastService.showAlert('Approval confirmed!', 1);
    } else {
      this.toastService.showAlert('Please verify and check the details.', 0);
    }
    this.displayApprovalDialog = false;
  }

  approveRow(rowData: any) {
    this.selectedCapturePfInterestYear = rowData;
    this.isVerifiedAndChecked = false; // Reset checkbox state
    this.displayApprovalDialog = true;
  }
 
    onCheckboxChange(index: number): void {
        if (this.selectedCheckbox === index) {
            this.selectedCheckbox = null; // Uncheck if already checked
        } else {
            this.selectedCheckbox = index; // Check the selected checkbox
        }
    }
}

