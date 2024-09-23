import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpeningbalancecaptureService {
  BaseURL: string = `${environment.BaseURL}`;
  constructor(private http: HttpClient, private toastService: ToastService) {}
 
  // getTableData(SearchBy: string, Code: string): Observable<IapiResponce> {
  //   return this.http.post<IapiResponce>(`${this.BaseURL}GetAllOPenBal?SearchBy=${SearchBy}&Code=${Code}`, "").pipe(
  //     catchError((error) => {
  //       throw this.toastService.showError(error.Message);
  //     })
  //   );
  // }
  getHOA(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/HOA/GetAllHOA').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
  getTresury(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/GenTreasury/GetAllTreasury').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
  getPFDAdmin(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/OpenBalView/GetAllPFDAdmins').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
//   getpermissionstatus(): Observable<IapiResponce> {
//     return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Permission/GetAllPermissionStatus').pipe(
//         catchError((error) => {
//             throw this.toastService.showError(error.Message);
//         })
//     );
// }
getTableData(HOA: string, treasurycode: string,pfdAdmin:number): Observable<IapiResponce> {
  const url = `${this.BaseURL}api/v1/OpenBalView/GetAllPfdAdminOpBal?HOA=${HOA}&treasury=${treasurycode}&PfdAdmin=${pfdAdmin}`;
  return this.http.get<IapiResponce>(url).pipe(
    catchError((error) => {
      throw this.toastService.showError(error.Message);
    })
  );
}
getAcceptanceBalance(): Observable<IapiResponce> {
  const url = `${this.BaseURL}api/v1/OpenBalAccept/GetAllOpenBalAcceptance`;
  return this.http.get<IapiResponce>(url).pipe(
    catchError((error) => {
      throw this.toastService.showError(error.Message);
    })
  );
}
InsertBalanceAcceptanceData(payload:any): Observable<IapiResponce> {
  return this.http.post<IapiResponce>(this.BaseURL + 'api/v1/OpenBalAccept/InsertOpenBalAcceptance', payload).pipe(
      catchError((error) => {
          throw this.toastService.showError(error.Message);
      })
  );
}

}
