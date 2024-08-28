import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-purpose-tagging-master',
  templateUrl: './purpose-tagging-master.component.html',
  styleUrls: ['./purpose-tagging-master.component.scss']
})
export class PurposeTAggingMasterComponent implements OnInit {
  purposeTaggingMaster!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.purposeTaggingMaster = this.fb.group({
      HOA: ['', Validators.required],
      treasury:['', Validators.required],
      selectedItemPfdAdmin:[Validators.required],
    });
  }
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.purposeTaggingMaster.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }  
}
