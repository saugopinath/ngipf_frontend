import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-deposite-tresury-bank',
  templateUrl: './view-deposite-tresury-bank.component.html',
  styleUrls: ['./view-deposite-tresury-bank.component.scss']
})
export class ViewDepositeTresuryBankComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  basicChallanList(){
    this.router.navigate(['depositeDetails/viewDepositeTresuryBank/bankChallanList']);
  }
  insertbank(){
    this.router.navigate(['depositeDetails/viewDepositeTresuryBank/insert']);
  }
}
