import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-workflow-management',
  templateUrl: './workflow-management.component.html',
  styleUrls: ['./workflow-management.component.scss']
})
export class WorkflowManagementComponent implements OnInit {

  workflowmanagementForm !: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.workflowmanagementForm = this.fb.group({
      Office: ['', Validators.required],
      Functionality: ['', Validators.required],
     
    });
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.workflowmanagementForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }


}
