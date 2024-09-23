import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApproveInterestRate } from '../../models/InterestRate/interestRate';

@Injectable({
    providedIn: 'root',
})
export class InterestRateService {
    BaseURL: string = `${environment.BaseURL}`;
    constructor(private http: HttpClient, private toastService: ToastService) {}

    InsertInterestRateMaster(payload: ApproveInterestRate): Observable<IapiResponce> {
        return this.http.post<IapiResponce>(this.BaseURL + 'api/v1/InterestRateMaster/InsertInterestRateMaster', payload).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
    getInterestRate(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/InterestRateMaster/GetAllInterestRateMaster').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
      }
}





