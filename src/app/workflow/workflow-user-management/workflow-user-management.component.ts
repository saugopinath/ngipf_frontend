import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from './../../../../src/app/core/services/toast.service';
import { WorkflowService } from '../../core/services/workflow/workflow.service';
import { convertDate } from './../../../../src/app/utils/dateConversion';
import { Router } from '@angular/router';
interface UserList {
  role: string;
  name: string;
}

@Component({
  selector: 'app-workflow-user-management',
  templateUrl: './workflow-user-management.component.html',
  styleUrls: ['./workflow-user-management.component.scss']
})
export class WorkflowUserManagementComponent implements OnInit {
  userMapping: UserList[] = [];

  constructor(private fb: FormBuilder, private toastService: ToastService, private WorkflowService: WorkflowService, private router: Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getUserMappingList();
  }
  initializeForm(): void {
   
  }
  getUserMappingList() {
    this.WorkflowService.getOffice().subscribe((response) => {
        if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
            response.result.map((item, index) => {
                item.Name = item.Name ;
                item.Code = item.Code;
            });
            this.userMapping = response.result;
        }
    });
}

}
