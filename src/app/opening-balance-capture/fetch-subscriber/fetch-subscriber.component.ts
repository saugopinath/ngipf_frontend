import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-fetch-subscriber',
  templateUrl: './fetch-subscriber.component.html',
  styleUrls: ['./fetch-subscriber.component.scss']
})
export class FetchSubscriberComponent implements OnInit {

  fetchSubscriberForm!: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.fetchSubscriberForm = this.fb.group({
      Head_of_Account:['',Validators.required],
      pfd_Admin:['',Validators.required],
      Sanction_Admin:['',Validators.required],
      salary_Source:['',Validators.required],
      emp_id:[''],
      department:[''],
      remarks: [''],
    })
  };


  isInvalidAndTouched(controlName: string): boolean {
    const control = this.fetchSubscriberForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
