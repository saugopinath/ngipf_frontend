import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from './../../../../src/app/core/services/toast.service';
import { MasterService } from '../../core/services/master/master.service';
import { WorkflowService } from '../../core/services/workflow/workflow.service';
import { convertDate } from './../../../../src/app/utils/dateConversion';
import { Router,ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

import { groupBy, mergeMap, toArray } from 'rxjs/operators';

interface CodeMasterList {
  name: string;
  code: number;
}
interface PfdAdminList {
  name: string;
  code: number;
  id: number,
  intOperatorId: number,
  intOperatorCode: number,
  operatorName:string,
  intDdoId: number,
  ddoName: string,
  intHoaId: 1,
  hoa: string,
  intTreasuryId: number,
  treasuryCode: string,
  treasuryName: string,
  intSchemeHead: number,
  schemeHeadName: string
}

@Component({
  selector: 'app-workflow-edit',
  templateUrl: './workflow-edit.component.html',
  styleUrls: ['./workflow-edit.component.scss']
})
export class WorkflowEditComponent implements OnInit {
  workflowEditForm !: FormGroup;
  workflowid:any;
  UserId:any;
  entrymode:any;
  OfficeTypeMasterList: CodeMasterList[] = [];
  OfficeDisable:boolean;
  FuncMasterList: CodeMasterList[] = [];
  FuncDisable:boolean;
  HoadMasterList: CodeMasterList[] = [];
  HoaDisable:boolean;
  TresuaryMasterList: CodeMasterList[] = [];
  TresuaryDisable:boolean;
  PfdAdminMasterList:PfdAdminList[] = [];
  PfdAdminDisable:boolean;
  AddUserOption:boolean;
  hoa:number;
  tresury:number;
  public selectedPfdAdmin: any[] = [];

  constructor(private fb: FormBuilder, private toastService: ToastService, private MasterService: MasterService,private WorkflowService: WorkflowService,private route: ActivatedRoute, private router: Router,) { 
    this.selectedPfdAdmin = [
      {label: 'Select PFD Admin', value: 0,'name': 'Select PFD Admin','code':'0'},
      
  ];
  }

  ngOnInit(): void {
    this.initializeForm();
    const workflowid = this.route.snapshot.queryParamMap.get('workflowId');
    this.workflowid=workflowid;
    const UserId = this.route.snapshot.queryParamMap.get('UserId');
    this.UserId=UserId;
    const entrymode = this.route.snapshot.queryParamMap.get('entrymode');
    this.entrymode=entrymode;
    if(this.entrymode==1){
      this.HoaDisable=true;
    }
    this.getOfficeMaster();
    this.getFuncMaster();
    this.getHoaMaster();
  }
  initializeForm(): void {
    this.workflowEditForm = this.fb.group({
      Office: [''],
      Functionality: [''],
      Hoa: [''],
      Tresuary: [''],
      selectedPfdAdmin: this.selectedPfdAdmin
    });
    console.log(this.workflowEditForm);
  }
  getOfficeMaster() {
    this.WorkflowService.getOffice().subscribe((response) => {
        if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
            response.result.map((item, index) => {
                item.Name = item.Name ;
                item.Code = item.Code;
            });
            this.OfficeTypeMasterList = response.result;
        }
    });
}
getFuncMaster() {
  this.WorkflowService.getFunctionality().subscribe((response) => {
      if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
          response.result.map((item, index) => {
              item.Name = item.Name ;
              item.Code = item.Code;
          });
          this.FuncMasterList = response.result;
      }
  });
}
getHoaMaster() {
  this.MasterService.getHoa().subscribe((response) => {
      if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
          response.result.map((item, index) => {
              item.Name = item.Name ;
              item.Code = item.Code;
          });
          this.HoadMasterList = response.result;
      }
  });
}
HoaSelected($event) {
  this.hoa=$event.value.code;
  this.getTresuryByHoa($event.value.code);
}
TresurySelected($event) {
  this.getpFdAdminTreSuryByHoa($event.value,this.hoa);
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
getpFdAdminTreSuryByHoa(tresuryId: number,hoa: number) {
  this.MasterService.getPfdAdminByHoaandTresury(tresuryId,hoa).subscribe((response) => {
      if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
          response.result.map((item, index) => {
            item.Name = item.operatorName+' ('+item.operatorCode+')';
            item.Code = item.intOperatorId;
             
          });
          this.PfdAdminMasterList = response.result;
          console.log(this.PfdAdminMasterList);
          
          
      }
  });
}
  onViewUserDetails(intMmWorkflowStatusCode: number) {
    this.router.navigate(['workflow/user/onViewUserDetails'+intMmWorkflowStatusCode]);
  }
}
