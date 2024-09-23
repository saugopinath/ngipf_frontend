import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OpeningbalancecaptureService } from 'src/app/core/services/openingbalancecapture/openingbalancecapture.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/app/utils/dateConversion';
import { ViewService } from 'src/app/core/services/openingbalancecapture/view.service';
interface Treasury {
    treasuryName: string;
    treasuryCode: string;
}
interface PFDAdmin {
    pfdName: string;
    pfdCode: number;
    // operaterCode: number;
}
interface hoaName {
    hoaName: string;
    hoaCode: string;
}
@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
    treasurySelected: number = 0;
    pfdSelected: number = 0;
    viewForm!: FormGroup;
    value: boolean;
    showTable: boolean = false;
    dropdownItemTreasuryname: Treasury[] = [];
    dropdownItemPfdAdmin: PFDAdmin[] = [];
    dropdownItemHoa: hoaName[] = [];
    tableData: any[] = [];

    constructor(private fb: FormBuilder, private toastService: ToastService, private ViewService: ViewService,private OpeningbalancecaptureService: OpeningbalancecaptureService, private router: Router) {
        this.tableData = [{}];
    }
    ngOnInit(): void {
        this.initializeForm();
        this.getHOA();
        this.getTresury();
        this.getPFDAdmin();
    }

    initializeForm(): void {
        this.viewForm = this.fb.group({
            Head_of_Account: ['', Validators.required],
            PFDAdmin: ['',Validators.required],
            Treasury: ['', Validators.required],
        });
    }

    checked() {
      const hoa = this.viewForm.get('Head_of_Account')?.value.hoa;
      const treasury = this.viewForm.get('Treasury')?.value;
      const pfdAdmin=this.viewForm.get('PFDAdmin')?.value;
      const data = {
        hoa: hoa,
        treasury: treasury,
        pfdAdmin: pfdAdmin
      };
      // console.log(data);
     
        this.router.navigate(['opening-balance-capture/view/sanctionAdminWise-OpeningBalance',{ data: JSON.stringify(data) }]);
    }

    // Method to check if a form control is invalid and touched
    isInvalidAndTouched(controlName: string): boolean {
        const control = this.viewForm.get(controlName);
        return control && control.invalid && (control.dirty || control.touched);
    }
    
    onSearch() {
        if (this.viewForm.valid) {
            const hoa = this.viewForm.get('Head_of_Account')?.value;
            const treasury = this.viewForm.get('Treasury')?.value;
             const pfdAdmin=this.viewForm.get('PFDAdmin')?.value;
            // console.log(hoa, treasury,pfdAdmin);
            this.getTableValues(hoa, treasury,pfdAdmin);
            this.showTable = true;
        } else {
            this.showTable = false;
            Object.keys(this.viewForm.controls).forEach((field) => {
                const control = this.viewForm.get(field);
                control?.markAsTouched({ onlySelf: true });
            });
        }
    }

   

    

    getHOA() {
        this.OpeningbalancecaptureService.getHOA().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item) => {
                    item.hoaName = item.institutions + ' (' + item.hoa + ')';
                });
                this.dropdownItemHoa = response.result;
                // console.log(this.dropdownItemHoa);
            }
        });
    }
    getTresury() {
        this.OpeningbalancecaptureService.getTresury().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item, index) => {
                    item.treasuryName = item.treasuryName + ' (' + item.treasuryCode + ')';
                    item.intTreasuryCode = item.intTreasuryCode;
                });
                this.dropdownItemTreasuryname = response.result;
                console.log(this.dropdownItemTreasuryname);
            }
        });
    }
    getPFDAdmin() {
        this.OpeningbalancecaptureService.getPFDAdmin().subscribe((response) => {
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
              response.result.map((item) => {
                item.pfdName = item.operatorName + ' (' + item.operatorId + ')';
                item.pfdCode=item.operatorId;
            });
                this.dropdownItemPfdAdmin = response.result;
                // console.log(this.dropdownItemPfdAdmin);
            }
        });
    }

   
    getTableValues(hoa: any, treasurycode: any, pfdAdmin:any) {
       console.log({hoa, treasurycode,pfdAdmin})
        this.OpeningbalancecaptureService.getTableData(hoa.hoa, treasurycode.intTreasuryCode, pfdAdmin.operatorId).subscribe((response) => {
            console.log(response);
            if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
                response.result.map((item: any) => {
                    item.pfRegisterDate = convertDate(item.pfRegisterDate);
                });
                this.tableData = response.result;
            //    console.log(this.tableData)
            } else {
                this.toastService.showAlert(response.message, response.apiResponseStatus);
            }
        });
    }
}
