import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bankdetails',
  templateUrl: './bankdetails.component.html',
  styleUrls: ['./bankdetails.component.scss']
})
export class BankdetailsComponent implements OnInit {


  submitted: boolean = false;

  activeState: boolean[] = [false, false, false,false,false,false,false,false,false,false];
    toggle(index: number) {
        this.activeState[index] = !this.activeState[index];
    }

  constructor(private fb: FormBuilder,private router: Router) { }

  addBank!:FormGroup;

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
  
  this.addBank=this.fb.group({
    ifsc:['', Validators.required],
    bankName:['', Validators.required],
    accNo:['',Validators.required],
    conAccNo:['', Validators.required],
    benName:['', Validators.required],
    selectedWED:[null,Validators.required],
    remarks:['',Validators.required],
});
  }
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.addBank.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
}
prevPage(){
  this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/office-details']);
}
nextPage() {
    this.router.navigate(['']);
    this.submitted = true;
}
}
