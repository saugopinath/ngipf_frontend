import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, retry } from 'rxjs';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { environment } from 'src/environments/environment';
import { DynamicTable, DynamicTableQueryParameters } from '../../models/dynamic-table';
import { InterestCreditedStatus } from 'src/app/core/models/interest';
@Injectable({
    providedIn: 'root',
})
export class CapturePFInterestYearService {
    BaseURL: string = `${environment.BaseURL}`;
    private actionButtonClickSubject = new Subject<void>();
    constructor(private http: HttpClient,private toastService: ToastService) {}
    actionButtonClicked() {
        this.actionButtonClickSubject.next();
    }
    
    getActionButtonObservable() {
        return this.actionButtonClickSubject.asObservable();
    }
   
    getList(path:string,queryParameters:DynamicTableQueryParameters): Observable<IapiResponce<DynamicTable<InterestCreditedStatus>>> {
        return this.http.post<IapiResponce<DynamicTable<InterestCreditedStatus>>>('v1/'+path,queryParameters).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            })
        );
    }
}
