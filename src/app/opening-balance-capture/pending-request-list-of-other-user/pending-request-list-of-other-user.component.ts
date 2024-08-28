import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

interface Office{
  name:string;
  code:string;
}
@Component({
  selector: 'app-pending-request-list-of-other-user',
  templateUrl: './pending-request-list-of-other-user.component.html',
  styleUrls: ['./pending-request-list-of-other-user.component.scss'],
  providers: [MessageService]
})
export class PendingRequestListOfOtherUserComponent implements OnInit {

  PendinglistForm! : FormGroup
  dropdownItemOfficeType: Office[];
  displaySuccessDialog: boolean = false;
  displayResetDialog: boolean = false;
  


  constructor(private fb : FormBuilder,private messageService: MessageService) {
    this.dropdownItemOfficeType = [
      { name: 'DPPG Head of Office', code: 'DPPG Head of Office' },
      { name: 'Delegated DPPG', code: 'Delegated DPPG' },
      { name: 'PFD Admin Office', code: 'PFD Admin Office' },
      ];
   }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.PendinglistForm = this.fb.group({
      Office: ['', Validators.required],
      
      
    });
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.PendinglistForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
  onsearch(): void {
    if (this.PendinglistForm.valid) {
      this.displaySuccessDialog = true;
    } else {
      this.PendinglistForm.markAllAsTouched();
    }
  }

  onCloseSuccessDialog(): void {
    this.displaySuccessDialog = false;
  }
  confirmReset(): void {
    this.displayResetDialog = true;
  }

  onCancelReset(): void {
    this.displayResetDialog = false;
  }

  onConfirmReset(): void {
    this.PendinglistForm.reset();
    this.displayResetDialog = false;
    this.messageService.add({
      severity: 'warn',
      summary: 'Reset',
      detail: 'The form has been reset.'
    });
  }
}

