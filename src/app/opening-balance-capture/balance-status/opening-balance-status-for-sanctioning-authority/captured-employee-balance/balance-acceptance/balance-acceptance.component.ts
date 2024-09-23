import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpeningbalancecaptureService } from 'src/app/core/services/openingbalancecapture/openingbalancecapture.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-balance-acceptance',
  templateUrl: './balance-acceptance.component.html',
  styleUrls: ['./balance-acceptance.component.scss']
})
export class BalanceAcceptanceComponent implements OnInit {
  acceptedBalance: any[] = []
BalanceAcceptanceForm! : FormGroup;
openingBalanceDate1: string;
isReadOnly = true; 
item: any[] = [];

  constructor(private fb: FormBuilder,private OpeningBalanceCaptureService: OpeningbalancecaptureService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    const date1 = new Date('2022-04-12');
    this.openingBalanceDate1 = this.formatDate(date1); 
   this.getBalanceAcceptanceData();
    
  }


formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.BalanceAcceptanceForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
}
getBalanceAcceptanceData(): void {
  this.OpeningBalanceCaptureService.getAcceptanceBalance().subscribe(
    (response: any) => {
      console.log('Balance response:', response);
      if (response.apiResponseStatus === 0 || response.apiResponseStatus === 1 || response.apiResponseStatus === 3) {
        this.acceptedBalance = response.result;  // Assign the result to acceptedBalance
      } else {
        this.toastService.showAlert(response.message, response.apiResponseStatus);
      }
    },
    (error: any) => {
      console.error('Error fetching Balance:', error);
      this.toastService.showError('Error fetching Balance');
    }
  );
}

  BalanceAcceptance() {
    const payload = this.acceptedBalance.map(item => ({
    dataSource: item.dataSource,
    openingBalance:item.openingBalance,
    interest:  item.interest,
    totalDeposite:item.totalDeposite,
    totalWithdrawal:item.totalWithdrawal,
    closingBalance:item.closingBalance,
    interestAfter:item.interestAfter,
    openingBalanceNew:item.openingBalanceNew,
    suspenseBalance:item.suspenseBalance,   
    action:"string",
  }));
  
    
    this.OpeningBalanceCaptureService.InsertBalanceAcceptanceData(payload).subscribe((response) => {
        if (response.apiResponseStatus == 1 ) {
           this.toastService.showSuccess(response.message)
            
        }else{
            this.toastService.showError(response.message)
        }
    });
   
}
}
  




