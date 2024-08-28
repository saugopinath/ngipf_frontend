import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  activeState: boolean[] = [true, false,false];
  addPfOffice!:FormGroup;
  addDDO!:FormGroup;
  addLFOperator!:FormGroup;
  submitted: boolean = false;
  toggle(index: number) {
    this.activeState[index] = !this.activeState[index];
  }
  constructor(private fb: FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.addPfOffice=this.fb.group({
      HOOCode:[''],
      offName:[''],
      pfdAdmin:[''],
      WED:[''],
      RecommAdmin:[''],
      sancationAdmin:[''],
      pfAdmin:[''],
  });
  this.addDDO=this.fb.group({
    DDOCode:[''],
    tresuryCode:[''],
    WED:[''],
});
this.addLFOperator=this.fb.group({
    OperatorName:[''],
    tresuryCode:[''],
    WED:[''],
})
  }
  nextPage(){
    this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Bank-details']);
    this.submitted = true;
  }
  prevPage(){
    this.router.navigate(['employeeDetails/viewEmployee/entryEmployee/Salary']);
  }

}
