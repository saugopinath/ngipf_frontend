import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.scss']
})
export class SalaryComponent implements OnInit {

  submitted: boolean = false;

  activeState: boolean[] = [false, false, false,false,false,false,false,false,false,false];
    toggle(index: number) {
        this.activeState[index] = !this.activeState[index];
    }

  constructor(private fb: FormBuilder,private router: Router) { }

  addSalary!:FormGroup;
  

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {

    this.addSalary=this.fb.group({
      auto:[''],
      selectedWED:[null,Validators.required],
      basicPay:[''],
      gradePay:[''],
  });
  }
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.addSalary.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
}
prevPage(){
  this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Contact-details']);
}
nextPage() {
    this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/office-details']);
    this.submitted = true;
}
}

