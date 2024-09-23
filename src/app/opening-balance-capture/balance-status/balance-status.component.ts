import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-balance-status',
  templateUrl: './balance-status.component.html',
  styleUrls: ['./balance-status.component.scss']
})
export class BalanceStatusComponent implements OnInit {
balanceStatus: any[];
  

  constructor(private router: Router) { 
    this.balanceStatus = [
      {
        NGIPFAdmin: 'John Doe ',
        BalanceCaptureDate: 'PF00123',
        ClosingBalance: 'Accounts',
        Interest: 50000,
        OpeningBalance: 10000,
        CapturedBalance: 15000,
        TotalSubscriber: 2000,
        NoofApprovedBalance: 57000,
        FinalSubmission:7990,
        status: 'Active',
        
      },
      {
        NGIPFAdmin: 'John Doe',
        BalanceCaptureDate: 'PF00123',
        ClosingBalance: 'Accounts',
        Interest: 50000,
        OpeningBalance: 10000,
        CapturedBalance: 15000,
        TotalSubscriber: 2000,
        NoofApprovedBalance: 57000,
        FinalSubmission:7990,
        status: 'Active',      },
    ];
  
  }

  ngOnInit(): void {
  }
  chekedStatus(){
    this.router.navigate(['opening-balance-capture/balance-status/balance-status(sanctioning authority)']);
  }
}
