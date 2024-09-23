import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InitialBalancePFDAdminService } from 'src/app/core/services/openingbalancecapture/initial-balance-pfdadmin.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { convertDate } from 'src/app/utils/dateConversion';

@Component({
  selector: 'app-initial-balance-capture-for-pfdadmin',
  templateUrl: './initial-balance-capture-for-pfdadmin.component.html',
  styleUrls: ['./initial-balance-capture-for-pfdadmin.component.scss']
})
export class InitialBalanceCaptureForPFDAdminComponent implements OnInit {

  PfdAdminData!:FormGroup;
  showTable:boolean=false;
  tableData:any[]=[];
  constructor(private fb:FormBuilder,private initialBalancePfdService:InitialBalancePFDAdminService,private toastService: ToastService) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm():void{
    this.PfdAdminData = this.fb.group({
      Head_of_Account: ['', [Validators.pattern(/^[0-9]*$/)]], // Only numbers
      treasury: ['', [Validators.pattern(/^[0-9]*$/)]],       // Only numbers
      pfdAdmin: ['', [Validators.pattern(/^[0-9]*$/)]],       // Only numbers
    });
  }

  resetForm(): void {
    this.PfdAdminData.reset();
  }
  getTableValues(hoa:number,treasury:number,pfdAdmin:number){
    this.initialBalancePfdService.getTableData(hoa,treasury,pfdAdmin).subscribe((response) => {
      //console.log(response);
      if (response.apiResponseStatus == 0 ||response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
        response.result.map((item: any) => {
          item.pfRegisterDate = convertDate(item.pfRegisterDate);
      });
        this.tableData = response.result;
        console.log(this.tableData);

        
      } else {
          this.toastService.showAlert(response.message, response.apiResponseStatus);
      }
  });
}
  onSearch(){
    this.showTable=true;
    const hoa=this.PfdAdminData.get('Head_of_Account')?.value;
    const treasury=this.PfdAdminData.get('treasury')?.value;
    const pfdAdmin=this.PfdAdminData.get('pfdAdmin')?.value;
    console.log(hoa,treasury,pfdAdmin);
    this.getTableValues(hoa,treasury,pfdAdmin);
  }

}
