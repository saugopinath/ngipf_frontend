import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from './../../../../src/app/core/services/toast.service';
import { WorkflowService } from '../../core/services/workflow/workflow.service';
import { convertDate } from './../../../../src/app/utils/dateConversion';
import { Router,ActivatedRoute } from '@angular/router';

interface UserList {
  intMmWorkflowUserMapping: number;
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
  workflowid:any;

  constructor(private fb: FormBuilder, private toastService: ToastService, private WorkflowService: WorkflowService,private route: ActivatedRoute, private router: Router,
    ) { }

  ngOnInit(): void {
    const workflowid = this.route.snapshot.queryParamMap.get('workflowId');
    this.workflowid=workflowid;
    this.initializeForm();
    this.getUserMappingList(this.workflowid);
  }
  initializeForm(): void {
    //console.log(this.workflowid);
   
  }
  getUserMappingList(WorkFlowid: number) {
    this.WorkflowService.getUser(WorkFlowid).subscribe((response) => {
        if (response.apiResponseStatus == 0 || response.apiResponseStatus == 1 || response.apiResponseStatus == 3) {
            response.result.map((item, index) => {
                item.intMmWorkflowUserMapping = item.intMmWorkflowUserMapping ;
                item.role = item.role ;
                item.name = item.name;
            });
            this.userMapping = response.result;
        }
    });
}
onViewUserDetails(intMmWorkflowStatusCode: number) {
  this.router.navigate(
    ['/workflow/user/addEdit'],
    {queryParams:{entrytype:1,MappedUserId:intMmWorkflowStatusCode}}
    );
  //this.router.navigate(['workflow/user/addEdit?entrytype=1&MappeduserdId='+intMmWorkflowStatusCode]);
}

}
