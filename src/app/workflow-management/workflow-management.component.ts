import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Name {
  name: string;
}
interface Treasury {
  treasuryName: string;
  treasuryCode: string;
  intTreasuryCode: number;
}
interface HOA {
  hoaName: string;
  hoaCode: string;
}
interface PFDAdmin {
  pfdName: string;
  pfdCode: number;
}

@Component({
  selector: 'app-workflow-management',
  templateUrl: './workflow-management.component.html',
  styleUrls: ['./workflow-management.component.scss']
})
export class WorkflowManagementComponent implements OnInit {
  workflowmanagementForm!: FormGroup;
  showTreasury: boolean = false;
  showFuncality: boolean = true; // Start hidden for "all" option
  showAllFields: boolean = false;// New flag to show all fields
  showButton:boolean=true;
  showAddButton:boolean=false;
  dropdownItemFunctionality: Name[] = [];
  dropdownItemTreasuryname: Treasury[] = [];
  dropdownItemHOA: HOA[] = [];
  dropdownItemPfdAdmin: PFDAdmin[] = [];
  showTable: boolean = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
    this.workflowmanagementForm.get('Search_By')?.valueChanges.subscribe(value => {
      this.toggleFieldsVisibility(value);
    });
  }

  initializeForm(): void {
    this.workflowmanagementForm = this.fb.group({
      Search_By: ['', Validators.required],
      Treasury: ['',Validators.required],
      funcality: ['',Validators.required],
      hoa: ['',Validators.required],
      PFDAdmin: ['',Validators.required],
      role:[''],
      user:['']
    });
  }

  toggleFieldsVisibility(value: string): void {
    if (value === 'all') {
      this.showTreasury = true;
      this.showFuncality = true;
    } else if (value === 'delegatedDPPG') {
      this.showTreasury = true;
      this.showFuncality = true;
      this.showAddButton=true;
      this.workflowmanagementForm.get('Treasury')?.setValidators(Validators.required);
      this.workflowmanagementForm.get('funcality')?.clearValidators();
    } else if (value === 'delegatedDPPGOffice') {
      this.showTreasury = false;
      this.showFuncality = true;
      this.workflowmanagementForm.get('Treasury')?.setValidators(Validators.required);
      this.workflowmanagementForm.get('funcality')?.setValidators(Validators.required);
    }
    this.workflowmanagementForm.get('Treasury')?.updateValueAndValidity();
    this.workflowmanagementForm.get('funcality')?.updateValueAndValidity();
  }

  search(): void {
    if (this.workflowmanagementForm.valid) {
      this.showTable=true;
    }
  }
  addNew(){
    this.showAllFields=true;
    this.showButton=false;
  }
  // Method to reset the form
  resetForm(): void {
    this.workflowmanagementForm.reset();
    this.showTreasury = false;
    this.showFuncality = false;
    this.showAllFields = false;
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.workflowmanagementForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
