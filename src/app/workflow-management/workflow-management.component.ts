import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/toast.service';
import { WorkflowService } from '../core/services/workflow/workflow.service';
import { convertDate } from 'src/app/utils/dateConversion';
import { Router } from '@angular/router';
interface OfficeTypeMasterList {
  name: string;
  code: number;
}
interface FuncMasterList {
  name: string;
  code: number;
}
interface HooList {
  intMmWorkflowStatusCode: number,
  hoa: string,
  functionality: string,
  office: string,
  treasury: string,
  ngipfAdmin: string
}
@Component({
  selector: 'app-workflow-management',
  templateUrl: './workflow-management.component.html',
  styleUrls: ['./workflow-management.component.scss']
})
export class WorkflowManagementComponent implements OnInit {
  dropdownItemOfficeTypeMasterList: OfficeTypeMasterList[] = [];
  dropdownItemFuncMasterList: FuncMasterList[] = [];
  workflowmanagementForm !: FormGroup;
  showTable: boolean = false;
  HooList: HooList[] = [];
  

  constructor(private fb: FormBuilder, private toastService: ToastService, private WorkflowService: WorkflowService, private router: Router) {}

  ngOnInit(): void {
    this.initializeForm();
    this.getOfficeMaster();
    this.getFuncMaster();
  }

  initializeForm(): void {
    this.workflowmanagementForm = this.fb.group({
      Office: ['', Validators.required],
      Functionality: ['', Validators.required],
     
    });
  }

  // Method to check if a form control is invalid and touched
  isInvalidAndTouched(controlName: string): boolean {
    const control = this.workflowmanagementForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
  getOfficeMaster() {
    this.WorkflowService.getOffice().subscribe((response) => {
        if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
            response.result.map((item, index) => {
                item.Name = item.Name ;
                item.Code = item.Code;
            });
            this.dropdownItemOfficeTypeMasterList = response.result;
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
          this.dropdownItemFuncMasterList = response.result;
      }
  });
}
getHooList(IntFuncId: number,IntOfficeTypeId:string) {
  this.WorkflowService.searchHoo().subscribe((response) => {
      if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
          response.result.map((item, index) => {
              item.hoa = item.hoa;
              item.functionality = item.functionality;
              item.office = item.office;
              item.treasury = item.treasury;
              item.ngipfAdmin = item.ngipfAdmin;
              item.intMmWorkflowStatusCode = item.intMmWorkflowStatusCode;
          });
          this.HooList = response.result;
         //console.log(this.OpList);
      }
  });
}
onSearchList() {
  if (this.workflowmanagementForm.valid) {
    this.showTable=true;
      const formValues = this.workflowmanagementForm.value;
      //console.log(formValues.Functionality.code)
      //console.log(formValues.Office.code)
      this.getHooList(formValues.Functionality.code,formValues.Office.code);
  } else {
    this.showTable = false;
    Object.keys(this.workflowmanagementForm.controls).forEach((field) => {
      const control = this.workflowmanagementForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
}

}
