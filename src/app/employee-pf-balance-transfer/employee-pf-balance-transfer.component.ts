import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-pf-balance-transfer',
  templateUrl: './employee-pf-balance-transfer.component.html',
  styleUrls: ['./employee-pf-balance-transfer.component.scss']
})
export class EmployeePFBalanceTransferComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
  transferhistory(){
    this.router.navigate(['employee-pf-balance-transfer/transfer-history']);
  }
}
