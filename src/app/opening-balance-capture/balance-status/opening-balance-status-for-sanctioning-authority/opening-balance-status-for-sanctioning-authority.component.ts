import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opening-balance-status-for-sanctioning-authority',
  templateUrl: './opening-balance-status-for-sanctioning-authority.component.html',
  styleUrls: ['./opening-balance-status-for-sanctioning-authority.component.scss']
})
export class OpeningBalanceStatusForSanctioningAuthorityComponent implements OnInit {
balanceStatusforSanctioning: any[];
BalanceStatusForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) { 
    this.balanceStatusforSanctioning = [
      {
        
               
      },
      

    ]
  }

  ngOnInit(): void {
    this.initializeForm();
  }
  captureBalance(){
    this.router.navigate(['opening-balance-capture/balance-status/balance-status(sanctioning authority)/captured-employee-balance']);
  }
  initializeForm(): void {
    this.BalanceStatusForm = this.fb.group({
        Head_of_Account: ['', ],
        Treasury: ['', ],
       NGIPF_Administrator: ['', ],
    });
}
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.BalanceStatusForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
}
}
