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
  
  PaymentForm!: FormGroup;
  dropdownItemsearchType: name[];
  
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

    this.dropdownItemsearchType = [

      { name: 'Financial year', code: 'Financial year' },
      { name: 'PF Account No.', code: 'PF Account No.' },
      { name: 'Employee Name', code: 'Employee Name' },
      { name: 'Employee Id', code: 'Employee Id' },
    ]
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.PaymentForm = this.fb.group({
      Search_By: ['', Validators.required],
      Financial_Year : ['', Validators.required],
      
    });
  }


}

