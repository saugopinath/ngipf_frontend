import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewService } from 'src/app/core/services/openingbalancecapture/view.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-sanction-admin-wise-opening-balance',
  templateUrl: './sanction-admin-wise-opening-balance.component.html',
  styleUrls: ['./sanction-admin-wise-opening-balance.component.scss'],
})
export class SanctionAdminWiseOpeningBalanceComponent implements OnInit {
  tableData: any[];
  BalanceStatusForm!: FormGroup;
  isReadOnly = true;
  ParentViewData: any;
  isEditable: any;
  pfdCode:any;
  treasury:string;
  constructor(private fb: FormBuilder, private router: Router, private toastService: ToastService, private ViewService: ViewService, private route: ActivatedRoute) {
    (this.tableData = [{}]),
      this.route.params.subscribe((params) => {
        if (params['data']) {
          this.ParentViewData = JSON.parse(params['data']);
          this.initializeForm();
        }

      });
      this.pfdCode=this.ParentViewData.pfdAdmin.operatorId;
      this.treasury=this.ParentViewData.treasury.intTreasuryCode;
      this.getChildTableValues(this.pfdCode);
  }

  ngOnInit(): void {}
  initializeForm(): void {
    this.BalanceStatusForm = this.fb.group({
      Head_of_Account: [{ value: this.ParentViewData != null ? this.ParentViewData.hoa : '', disabled: !this.isEditable }],
      Treasury: [{ value: this.ParentViewData != null ? this.ParentViewData.treasury.treasuryName : '', disabled: !this.isEditable }],
      PFD_Admin: [{ value: this.ParentViewData != null ? this.ParentViewData.pfdAdmin.operatorName : '', disabled: !this.isEditable }],
    });
  }

  CheckedPFRegisterYear() {
    //this.getSubChildTableValues(this.treasuryCode);
    // const treasuryCode = this.BalanceStatusForm.get('Treasury')?.value.intTreasuryCode;
    this.router.navigate(['opening-balance-capture/view/sanctionAdminWise-OpeningBalance/PF-Register-Year',{ data: JSON.stringify(this.treasury) }]);
  }
  getChildTableValues(pfdadmin: number) {
    this.ViewService.getTableData(pfdadmin).subscribe((response) => {
      console.log("Sanction", response);
      if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
        this.tableData = response.result;
        // console.log(this.tableData);
      } else {
        this.toastService.showAlert(response.message, response.apiResponseStatus);
      }
    });
  }
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.BalanceStatusForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }

}
