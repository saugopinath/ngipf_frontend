import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IapiResponce } from '../../models/iapi-responce';
import { catchError, Observable } from 'rxjs';
import { ApprovePermission } from '../../interceptors/PermissionOfInitiation/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionOfInitiationService {
  BaseURL: string = `${environment.BaseURL}`;
  constructor(private http: HttpClient, private toastService: ToastService) {}


  getTresury(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/GenTreasury/GetAllTreasury').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
  getHOA(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/HOA/GetAllHOA').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
getpermissionstatus(): Observable<IapiResponce> {
  return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Permission/GetAllPermissionStatus').pipe(
      catchError((error) => {
          throw this.toastService.showError(error.Message);
      })
  );
}
getInterestYears(): Observable<IapiResponce> {
  return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/FinYear/GetAllFinancialYear',).pipe(
      catchError((error) => {
          throw this.toastService.showError(error.Message);
      })
  );
}
getTableDataByTreasury(treasurycode:string):Observable<IapiResponce> {
  return this.http.get<IapiResponce>(this.BaseURL +`GetAllOPenBal?SearchBy=treasury&Code=${treasurycode}`).pipe(
      catchError((error) => {
          throw this.toastService.showError(error.Message);
      })
  );
}
getTableDataByHOA(hoa:string):Observable<IapiResponce> {
  return this.http.get<IapiResponce>(this.BaseURL +`GetAllOPenBal?SearchBy=hoa&Code=${hoa}`).pipe(
      catchError((error) => {
          throw this.toastService.showError(error.Message);
      })
  );
}
// pending api hoa&treasury
// getTableDataByHoaAndTreasury(hoa: string, treasuryCode: string): Observable<IapiResponce> {
//   return this.http.get<IapiResponce>(`${this.BaseURL}api/v1/HoaTreasurySearch/searchByHoaAndTreasuryCode?Hoa=${hoa}&TreasuryCode=${treasuryCode}`).pipe(
//       catchError((error) => {                         
//           this.toastService.showError(error.message);
//           throw error;
//       })
//   );
// }
InsertPermissionOfInitiationData(payload: any): Observable<IapiResponce> {
  return this.http.post<IapiResponce>(this.BaseURL + 'OpenBalPermission',payload).pipe(
      catchError((error) => {
          throw this.toastService.showError(error.Message);
      })
  );
}

}
