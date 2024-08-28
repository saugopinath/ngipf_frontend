import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-payment',
  templateUrl: './final-payment.component.html',
  styleUrls: ['./final-payment.component.scss']
})
export class FinalPaymentComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  finalpaymentClick(){
    this.router.navigate(['Final-payment/final-payment-application']);
  }
  MastClick(){
    this.router.navigate(['Final-payment/final-payment-eligibility-master'])
  }

}
