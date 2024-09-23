import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-captured-employee-balance',
  templateUrl: './captured-employee-balance.component.html',
  styleUrls: ['./captured-employee-balance.component.scss']
})
export class CapturedEmployeeBalanceComponent implements OnInit {
capturedBalance: any[];

  constructor(private router : Router) { 
    this.capturedBalance =[
      {

      }
    ]
  }

  ngOnInit(): void {
  }
acceptBalance(){
  // this.router.navigate(['opening-balance-capture/balance-status/balance-status(sanctioning authority)/captured-employee-balance/balance-acceptance']);
}
}
