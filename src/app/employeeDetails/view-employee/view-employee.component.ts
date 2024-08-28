import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  entryEmployee(){
    this.router.navigate(['employeeDetails/viewEmployee/entryEmployee']);
  }
  searchEmployee()
  {
    this.router.navigate(['employeeDetails/viewEmployee/searchEmployee']);
  }
  

}
