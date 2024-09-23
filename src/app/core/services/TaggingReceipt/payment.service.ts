import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IapiResponce } from '../../models/iapi-responce';
import { ToastService } from '../toast.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  
  BaseURL: string = `${environment.BaseURL}`;
    constructor(private http: HttpClient, private toastService: ToastService) {}

    getTresury(): Observable<IapiResponce> {
      return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/GenTreasury/GetAllTreasury').pipe(
          catchError((error) => {
              throw this.toastService.showError(error.Message);
          })
      );
    }
    getTableData(transactionType: string, paymentType: string): Observable<IapiResponce> {
      return this.http.get<IapiResponce>(this.BaseURL + `api/v1/Receipt/GetAllReceipt?TransType=${transactionType}&TransactionType=${paymentType}`).pipe(
          catchError((error) => {
              throw this.toastService.showError(error.Message);
          })
      );
    }
}
