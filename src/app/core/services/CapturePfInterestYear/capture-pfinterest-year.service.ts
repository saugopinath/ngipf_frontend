import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DynamicTable, DynamicTableQueryParameters } from '../../models/dynamic-table';

@Injectable({
    providedIn: 'root',
})
export class CapturePFInterestYearService {
    BaseURL: string = `${environment.BaseURL}`;
    constructor(private http: HttpClient, private toastService: ToastService) {}

 
    getList(path:string,queryParameters:DynamicTableQueryParameters): Observable<IapiResponce<DynamicTable<tokenDetails>>> {
        return this.http.post<IapiResponce<DynamicTable<tokenDetails>>>('v1/'+path,queryParameters).pipe(
            catchError((error) => {
                throw this.toastservice.showError(error.message);
            })
        );
    }
}
