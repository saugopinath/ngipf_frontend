import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { CapturePFInterestYearService } from 'src/app/core/services/CapturePFInterestYearDetails/capture-pfinterest-year.service';
import { MasterService } from 'src/app/core/services/master/master.service';


interface CodeMasterList {
    name: string;
    code: number;
  }




@Component({
    selector: 'app-capture-pf-interest-year',
    templateUrl: './capture-pf-interest-year.component.html',
    styleUrls: ['./capture-pf-interest-year.component.scss'],
})
export class CapturePfInterestYearComponent implements OnInit {
    capturePfInterestYearForm!: FormGroup;
    showTreasury: boolean = true;
    showHeadOfAccount: boolean = true;
    dropdownItemHeadOfAccountId:CodeMasterList[] = [];
    HoadMasterList: CodeMasterList[] = [];
    TresuaryMasterList: CodeMasterList[] = [];
    constructor(private fb: FormBuilder, private toastService: ToastService,private MasterService: MasterService, private CapturePFInterestYearService: CapturePFInterestYearService) {
  
        this.dropdownItemHeadOfAccountId = [
            { name: '2049', code: 2049 },
            
        ];
    }

    ngOnInit(): void {
        this.initializeForm();
       
        this.capturePfInterestYearForm.get('Search_By')?.valueChanges.subscribe((value) => {
            this.toggleFieldsVisibility(value);
        });
    }

    initializeForm(): void {
        this.capturePfInterestYearForm = this.fb.group({
            DebitHeadOfAccount: [''],
            HeadOfAccountId: ['', Validators.required],
            HeadOfAccount: [''],
            OperatorName: [''],
            Search_By: ['', Validators.required],
            Treasury: [''],
            Status: ['', Validators.required],
            Year: [''],
        });
    }

  
   
    toggleFieldsVisibility(value: string): void {
        if (value === 'option1') {  
            this.showTreasury = true;
            this.showHeadOfAccount = true;
            this.capturePfInterestYearForm.get('Treasury')?.setValidators(Validators.required);
            this.getHOA();
            this.capturePfInterestYearForm.get('HeadOfAccount')?.setValidators(Validators.required);
        } else if (value === 'option2') {
            this.showTreasury = false;
            this.showHeadOfAccount = true;
            this.capturePfInterestYearForm.get('Treasury')?.clearValidators();
            this.capturePfInterestYearForm.get('HeadOfAccount')?.setValidators(Validators.required);
        } else {
            this.showTreasury = true;
            this.showHeadOfAccount = false;
            this.capturePfInterestYearForm.get('Treasury')?.setValidators(Validators.required);
            this.capturePfInterestYearForm.get('HeadOfAccount')?.clearValidators();
        }
        this.capturePfInterestYearForm.get('Treasury')?.updateValueAndValidity();
        this.capturePfInterestYearForm.get('HeadOfAccount')?.updateValueAndValidity();
    }

    isInvalidAndTouched(controlName: string): boolean {
        const control = this.capturePfInterestYearForm.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }

    resetForm(): void {
        this.capturePfInterestYearForm.reset();
        this.showTreasury = true;
        this.showHeadOfAccount = true;
    }

   



    getHOA(): void {
        this.MasterService.getHoa().subscribe((response) => {
            console.log('hoa', { response });
            if ([0, 1, 3].includes(response.apiResponseStatus)) {
                if (response.result) {
                    response.result.map((item: any) => {
                        item.hoaName = item.institutions + ' (' + '00-' + item.hoa + ')';
                    });
                    this.HoadMasterList = response.result;
                }
            }
        });
    }
    HoaSelected($event) {
        this.getTresuryByHoa($event.value.code);
      }
    getTresuryByHoa(hoa: number) {
        this.MasterService.getTresuryByHoa(hoa).subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item, index) => {
                  item.Name = item.treasuryName+' ('+item.treasuryCode+')';
                  item.Code = item.intTreasuryId;
                   
                });
                this.TresuaryMasterList = response.result;
               // console.log(this.TresuaryMasterList);
                
                
            }
        });
      }


  






    

 





    

  

  
 
}
