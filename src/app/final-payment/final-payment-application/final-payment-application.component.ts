import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



interface Year{
  Year: String;
  code: string;
} 
interface name{
  name: String;
  code: string;
} 

@Component({
  selector: 'app-final-payment-application',
  templateUrl: './final-payment-application.component.html',
  styleUrls: ['./final-payment-application.component.scss']
})
export class FinalPaymentApplicationComponent implements OnInit {

  dropdownItemYearType: Year[];
  showTable: boolean = false;
  PaymentForm!: FormGroup;
  dropdownItemsearchType: name[];
  showFinancialYear: boolean=true;
  showPFAccountNo: boolean=true;
  showEmployeeName: boolean=true;
  showEmployeeId: boolean=true;
  setTableData: [];
   tableData: any;
  
  constructor(private fb: FormBuilder) {
    this.dropdownItemYearType = [
      { Year: '2000', code: '2000' },
      { Year: '2001', code: '2001' },
      { Year: '2002', code: '2002' },
      { Year: '2003', code: '2003' },
      { Year: '2004', code: '2004' },
      { Year: '2005', code: '2005' },
      { Year: '2006', code: '2006' },
      { Year: '2007', code: '2007' },
      { Year: '2008', code: '2008' },
      { Year: '2009', code: '2009' },
      { Year: '2010', code: '2010' },
      { Year: '2011', code: '2011' },
      { Year: '2012', code: '2012' },
      { Year: '2013', code: '2013' },
      { Year: '2014', code: '2014' },
      { Year: '2015', code: '2015' },
      { Year: '2016', code: '2016' },
      { Year: '2017', code: '2017' },
      { Year: '2018', code: '2018' },
      { Year: '2019', code: '2019' },
      { Year: '2020', code: '2020' },
      { Year: '2021', code: '2021' },
      { Year: '2022', code: '2022' },
      { Year: '2023', code: '2023' },
      { Year: '2024', code: '2024' },
    ];

    // this.dropdownItemsearchType = [

    //   { name: 'Financial year', code: 'Financial year' },
    //   { name: 'PF Account No.', code: 'PF Account No.' },
    //   { name: 'Employee Name', code: 'Employee Name' },
    //   { name: 'Employee Id', code: 'Employee Id' },
    // ]
  }
  ngOnInit(): void {
    this.initializeForm();
    this.PaymentForm.get('Search_By')?.valueChanges.subscribe((value) => {
      this.toggleFieldsVisibility(value);
  });
  }

  initializeForm(): void {
    this.PaymentForm = this.fb.group({
      Search_By: ['', Validators.required],
      Financial_Year : ['', Validators.required],
      PF_Account_NO:['', Validators.required],
      Employee_Name : ['', Validators.required],
      Employee_Id:['', Validators.required],
    });
  }
  toggleFieldsVisibility(value: string): void {
    if (value === 'option1') {
        this.showFinancialYear = true;
        this.showPFAccountNo = false;
        this.showEmployeeName=false;
        this.showEmployeeId=false;
        this.PaymentForm.get('Financia_lYear')?.setValidators(Validators.required);
        this.PaymentForm.get('PF_Account_No')?.setValidators(Validators.required);
        this.PaymentForm.get('Employee_Name')?.setValidators(Validators.required);
        this.PaymentForm.get('Employee_Id')?.setValidators(Validators.required);
    } else if (value === 'option2') {
      this.showFinancialYear = false;
      this.showPFAccountNo = true;
      this.showEmployeeName=false;
      this.showEmployeeId=false;
      this.PaymentForm.get('FinancialYear')?.setValidators(Validators.required);
      this.PaymentForm.get('PFAccountNo')?.setValidators(Validators.required);
      this.PaymentForm.get('EmployeeName')?.setValidators(Validators.required);
      this.PaymentForm.get('EmployeeId')?.setValidators(Validators.required);
    } else if ( value === 'option3'){
      this.showFinancialYear = false;
      this.showPFAccountNo = false;
      this.showEmployeeName=true;
      this.showEmployeeId=false;
      this.PaymentForm.get('FinancialYear')?.setValidators(Validators.required);
      this.PaymentForm.get('PFAccountNo')?.setValidators(Validators.required);
      this.PaymentForm.get('EmployeeName')?.setValidators(Validators.required);
      this.PaymentForm.get('EmployeeId')?.setValidators(Validators.required);
    }
    else{
      this.showFinancialYear = false;
      this.showPFAccountNo = false;
      this.showEmployeeName=false;
      this.showEmployeeId=true;
      this.PaymentForm.get('FinancialYear')?.setValidators(Validators.required);
      this.PaymentForm.get('PFAccountNo')?.setValidators(Validators.required);
      this.PaymentForm.get('EmployeeName')?.setValidators(Validators.required);
      this.PaymentForm.get('EmployeeId')?.setValidators(Validators.required);
    }
    this.PaymentForm.get('FinancialYear')?.updateValueAndValidity();
    this.PaymentForm.get('PFAccountNo')?.updateValueAndValidity();
    this.PaymentForm.get('EmployeeName')?.updateValueAndValidity();
    this.PaymentForm.get('EmployeeId')?.updateValueAndValidity();
}


onSearch():void {
  if (this.PaymentForm.valid) {
      this.showTable = true;
  } else {
      this.showTable = false;
      Object.keys(this.PaymentForm.controls).forEach((field) => {
          const control = this.PaymentForm.get(field);
          control?.markAsTouched({ onlySelf: true });
      });
  }
 
}
isInvalidAndTouched(controlName: string): boolean {
  const control = this.PaymentForm.get(controlName);
  return control && control.invalid && (control.dirty || control.touched);
}



}

