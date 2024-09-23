import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {MultiSelectFilterOptions} from 'primeng/multiselect';
interface Purpose {
  id?: number; // Optional ID for database interaction
  name: string;
  selected?: boolean; // Indicate if the purpose is selected
  // Other properties as needed (e.g., description, category, etc.)
}
interface City {
  name: string,
  code: string
}
interface advanceType{
  name: string,
  code: string 
}
@Component({
  selector: 'app-purpose-tagging-master',
  templateUrl: './purpose-tagging-master.component.html',
  styleUrls: ['./purpose-tagging-master.component.scss']
})
export class PurposeTAggingMasterComponent implements OnInit {
  purposeTaggingMaster!: FormGroup;
  showAllFields:boolean=false;
  maxDateValue: Date = new Date(Date.now());
  dropdownItemadvanceType:advanceType[];
  cities: City[];
  displayDialog = false; // Set to true to show the dialog initially
  purposes: Purpose[] = [
    // Your list of purposes here
  ];
  filteredPurposes: Purpose[] = [];
  searchQuery: string = '';
  rows: number = 5;
  totalRecords: number = 0;
  verifiedAndChecked: boolean = false;
  checked: boolean = false;
  constructor(private fb: FormBuilder) {
    this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'London', code: 'u'},
      {name: 'London', code: 'o'},
      {name: 'London', code: 'LDN'},
      {name: 'London', code: 'LDN'},
      {name: 'London', code: 'LDN'},
      {name: 'London', code: 'LDN'},
      
  ];
    this.dropdownItemadvanceType=[
      {name:'Refundable Advance',code:'refundable advance'},
      {name:'Non-Refundable Advance',code:'nonrefundable advance'},
      {name:'Part Final Withdrawl',code:'Part Final Withdrawl'},
    ]
    this.filteredPurposes = this.purposes;
    this.totalRecords = this.purposes.length;
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.purposeTaggingMaster = this.fb.group({
      HOA: ['', Validators.required],
      treasury:['', Validators.required],
      selectedItemPfdAdmin:[Validators.required],
      selectedItemAdvanceType:[''],
      GONo:[''],
      selectedCities:[],
      selectedGODate:[],
      selectedWEFDate:[]
    });
  }
  addNew(){
    this.showAllFields=true;
  }
  onPurposeSelect(purpose: Purpose) {
    // Handle purpose selection logic here
  }

  closeDialog() {
    this.displayDialog = false;
  }

  ok() {
    this.displayDialog = false;
  }
  showDialog(){
    this.displayDialog=true;
  }
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.purposeTaggingMaster.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }  
}
