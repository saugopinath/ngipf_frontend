import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface hoa{
  hoaName:string
}
interface Treasury {
  treasuryName: string;
  treasuryCode: string;
  intTreasuryCode: number;
}
interface PFDAdmin {
  pfdName: string;
  pfdCode: number;
  // operaterCode: number;
}
@Component({
  selector: 'app-min-max-master',
  templateUrl: './min-max-master.component.html',
  styleUrls: ['./min-max-master.component.scss']
})
export class MinMaxMasterComponent implements OnInit {
  masterForm!:FormGroup;
  dropdownItemHOA:hoa[]=[]
  dropdownItemTreasuryname: Treasury[] = [];
  dropdownItemPfdAdmin: PFDAdmin[] = [];
  showTable:boolean=false;
  showAllFields:boolean=false;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.masterForm = this.fb.group({
      // hoa:['',Validators.required],
      // Treasury:['',Validators.required],
      // PFDAdmin:['',Validators.required],
      maxBasic:[''],
      minBasic:[''],
      GONo:[''],
      annualSubs:[''],
      selectedGODate:[''],
      selectedWEFDate:[''],
      hoa:[''],
      Treasury:['',],
      PFDAdmin:['',]
    });
  }
  search(){
    if (this.masterForm.valid) {
      this.showTable=true;
    }
  }
  addNew(){
    this.showAllFields=true;
  }
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.masterForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
