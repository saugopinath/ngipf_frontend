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
export class EmployeeDetailsService {
    BaseURL: string = `${environment.BaseURL}`;
    constructor(private http: HttpClient, private toastService: ToastService) {}

    getTresury(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/EmployeeView/GetAllTreasury').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }

    getPfdAdmin(intTreasuryCode: number): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/EmployeeView/GetAllPfdAdmin?TreasuryCode=' + intTreasuryCode).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }

    getSanctionAdmin(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/Sanction/GetAllSanction').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }

    viewEmployee(trCode: number, pfdCode: number): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/EmployeeView/GetEmpployee?treasury=' + trCode + '&OperatorId=' + pfdCode).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.message);
            })
        );
    }


    private data: any;

    setData(data: any) {
        this.data = data;
    }

    getData() {
        return this.data;
    }
}
