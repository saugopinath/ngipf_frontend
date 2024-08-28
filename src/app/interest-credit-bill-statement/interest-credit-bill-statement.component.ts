import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interest-credit-bill-statement',
  templateUrl: './interest-credit-bill-statement.component.html',
  styleUrls: ['./interest-credit-bill-statement.component.scss']
})
export class InterestCreditBillStatementComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }
initiateClick(){
  this.router.navigate(['Interest-credit-bill-statement/initiate_pf_interest_calculation'])
  }
  summaryClick(){
    this.router.navigate(['Interest-credit-bill-statement/interest_credit_bil_summary'])
  }
  FinalPaymentClick(){
    this.router.navigate(['Interest-credit-bill-statement/TR-43-for-final-payment'])
  }

  MasterClick(){
    this.router.navigate(['Interest-credit-bill-statement/interest-credit-generation-master'])
  }
}
