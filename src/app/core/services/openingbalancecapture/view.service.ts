import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {

  BaseURL: string = `${environment.BaseURL}`;
  constructor(private http: HttpClient, private toastService: ToastService) {}

  getTableData(pfdadmin:number): Observable<IapiResponce> {
    const url = `${this.BaseURL}api/v1/OpenBalView/GetAllPfdAdminwiseSanctionOpBal?PfdAdmin=${pfdadmin}`;
    return this.http.get<IapiResponce>(url).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.Message);
      })
    );
  }
  getSubTableData(treasury:string):Observable<IapiResponce> {
    const url = `${this.BaseURL}api/v1/OpenBalView/GetAllPfdSanctionWiseEmpOpBal?treasury=${treasury}`;
    return this.http.get<IapiResponce>(url).pipe(
      catchError((error) => {
        throw this.toastService.showError(error.Message);
      })
    );

  }
}
