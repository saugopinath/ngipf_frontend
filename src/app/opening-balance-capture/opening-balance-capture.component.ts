import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opening-balance-capture',
  templateUrl: './opening-balance-capture.component.html',
  styleUrls: ['./opening-balance-capture.component.scss']
})
export class OpeningBalanceCaptureComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  viewClick() {
    
     this.router.navigate(['opening-balance-capture/view']);
}

permissionClick(){
  this.router.navigate(['opening-balance-capture/permission_of_initiation']);
}
PendingClick(){
  this.router.navigate(['opening-balance-capture/pending_req_list_of_other_user']);
}
operatorClick(){
  this.router.navigate(['opening-balance-capture/operator_list_having-ve_balance_bypassed']);
}
EmployeeClick(){
  this.router.navigate(['opening-balance-capture/employee-wise-pf-register']);
}
fetchSubsriberClick(){
  this.router.navigate(['opening-balance-capture/fetchSubscriberData']);
}
initalCaptureBalanceClick(){
  this.router.navigate(['opening-balance-capture/initialCaptureBalanace']);
}
initalCaptureBalancePFDAdminClick(){
  this.router.navigate(['opening-balance-capture/initialCaptureBalanace/PFDAdmin']);
}
balanceStatusClick(){
  this.router.navigate(['opening-balance-capture/balance-status']);
}
Acceptance(){
  this.router.navigate(['opening-balance-capture/balance-status/balance-status(sanctioning authority)/captured-employee-balance/balance-acceptance'])
}
}
