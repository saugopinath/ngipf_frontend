import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { error } from 'console';
import { Message } from 'primeng/api';
@Injectable({
    providedIn: 'root',
})
export class WorkflowService {
    BaseURL: string = `${environment.BaseURL}`;
    constructor(private http: HttpClient, private toastService: ToastService) { }

    getOffice(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Workflow/OfficeTypeMasterList').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }

    getFunctionality(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Workflow/FuncMasterList').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
    searchWorkFlow(OfficeType:number,FuncCoe:number):Observable<IapiResponce>{
        return this.http.get<IapiResponce>(this.BaseURL+'api/v1/Workflow/GetEmpView?office_type='+OfficeType+'&funcCoe='+FuncCoe).pipe(
            catchError((error) => {
              throw this.toastService.showError(error.message);
            })
          );

    }
}
