import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewService } from 'src/app/core/services/openingbalancecapture/view.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
    selector: 'app-pf-register-year',
    templateUrl: './pf-register-year.component.html',
    styleUrls: ['./pf-register-year.component.scss'],
})
export class PfRegisterYearComponent implements OnInit {
    balanceStatus: any[];
    tableData: any[];
    OpeningBalanceViewTable: any;
    treasury: any;
    ParentSanctionTreasuryData:string
    constructor(private router: Router, private toastService: ToastService, private ViewService: ViewService, private route: ActivatedRoute) {
      this.tableData = [{}];
      this.route.params.subscribe((params) => {
        if (params['data']) {
          this.ParentSanctionTreasuryData = JSON.parse(params['data']);
          console.log(this.ParentSanctionTreasuryData);
          this.getSubChildTableValues(this.ParentSanctionTreasuryData)
        }

      });
  }

    ngOnInit(): void {}

    getSubChildTableValues(treasury: string) {
      this.ViewService.getSubTableData(treasury).subscribe((response) => {
          console.log('DATA', response);
          if (response.apiResponseStatus === 0 || response.apiResponseStatus === 1 || response.apiResponseStatus === 3) {
              this.tableData = response.result;
              console.log(this.tableData);
          } else {
              this.toastService.showAlert(response.message, response.apiResponseStatus);
          }
      });
  }
}
