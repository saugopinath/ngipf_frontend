import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ConfirmDialog } from 'primeng/confirmdialog';


@Injectable({
  providedIn: 'root'
})
export class InterestGenerationMasterService {
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
  
  getTableDataByHoaAndTreasury(hoa: string, treasuryCode: string): Observable<IapiResponce> {
    return this.http.post<IapiResponce>(`${this.BaseURL}api/InterestGeneration/GetAllInterestBill?HOA=${hoa}&Treasury=${treasuryCode}`,'').pipe(
        catchError((error) => {                         
            this.toastService.showError(error.message);
            throw error;
        })
    );
}
// approve():Observable<IapiResponce> {
//     return this.http.post<IapiResponce>(`${this.BaseURL}api/InterestGeneration/InsertBillType`,'').pipe(
//         catchError((error) => {                         
//             this.toastService.showError(error.message);
//             throw error;
//         })
//     );
// }
InsertInterestCreditGenerationMaster(payload:any): Observable<IapiResponce> {
    return this.http.post<IapiResponce>(this.BaseURL + 'api/InterestGeneration/InsertBillType', payload).pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
}

}
