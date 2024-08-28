import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



interface Year {
  Year: string;
  code: string;
}

@Component({
  selector: 'app-employee-wise-pf-register-with-interest',
  templateUrl: './employee-wise-pf-register-with-interest.component.html',
  styleUrls: ['./employee-wise-pf-register-with-interest.component.scss']
})
export class EmployeeWisePfRegisterWithInterestComponent implements OnInit {

  dropdownItemYearType: Year[];
  PFRegisterForm!: FormGroup;
  showTable : boolean= false;
  PFRegister : any []=[]
  
  constructor(private fb : FormBuilder) {
    this.dropdownItemYearType = [
      { Year: '2022-2023', code: '2022-2023' },
      { Year: '2023-2024', code: '2023-2024' },
      { Year: '2024-2025', code: '2024-2025' },
      ];
   }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.PFRegisterForm = this.fb.group({
      Head_of_Account: ['', Validators.required],
      PFD_Admin: ['', Validators.required],
      Financial_year: ['', Validators.required],
      Treasury: ['', Validators.required, ], // Assuming EmployeeId is a numeric value
      Sanction_Admin: ['', Validators.required],
      
    });
  }

  isInvalidAndTouched(controlName: string): boolean {
    const control = this.PFRegisterForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
  onSearch(){
    if(this.PFRegisterForm.valid){
      this.showTable=true;
    }else{
      this.showTable= false;
      Object.keys(this.PFRegisterForm.controls).forEach(field =>{
        const control=this.PFRegisterForm.get(field);
        control?.markAsTouched({onlySelf :true});
    });
    }
  }


 
}
