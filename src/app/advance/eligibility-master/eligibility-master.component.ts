import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
interface advanceType{
  name: string,
  code: string 
}
@Component({
  selector: 'app-eligibility-master',
  templateUrl: './eligibility-master.component.html',
  styleUrls: ['./eligibility-master.component.scss']
})
export class EligibilityMasterComponent implements OnInit {
  eligibilityMaster!: FormGroup;
  dropdownItemadvanceType:advanceType[];
  constructor(private fb: FormBuilder) 
  {
    this.dropdownItemadvanceType=[
      {name:'Refundable Advance',code:'refundable advance'},
      {name:'Non-Refundable Advance',code:'nonrefundable advance'},
      {name:'Part Final Withdrawl',code:'Part Final Withdrawl'},
    ]
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.eligibilityMaster = this.fb.group({
      HOA: ['', Validators.required],
      treasury:['', Validators.required],
      selectedItemPfdAdmin:[Validators.required],
      selectedItemAdvanceType:[Validators.required], 
    });
  }
  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.eligibilityMaster.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }  
}
