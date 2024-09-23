import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CapturePFInterestYearService {
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
    getHOAId(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/InterestYrCap/GetAllHoaIds').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
    // getOperatorName(treasury:string): Observable<IapiResponce> {
    //     return this.http.get<IapiResponce>(this.BaseURL + `api/v1/OpenBalView/GetAllPFDAdmin?Treasury=${treasury}`).pipe(
    //         catchError((error) => {
    //             throw this.toastService.showError(error.Message);
    //         })
    //     );
    // }
    getOperatorName(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/OpenBalView/GetAllPFDAdmins').pipe(
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

    
    capturePFInterest(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/HoaTreasurySearch/HoaTreasurySearch').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
    getTableDataByHOA(hoa:string):Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL +`api/v1/HoaTreasurySearch/SearchByHoa ?hoa=${hoa}`).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
    getTableDataByTreasury(treasurycode:string):Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL +`api/v1/HoaTreasurySearch/SearchByTreasuryCode?TreasuryCode=${treasurycode}`).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
   

    getTableDataByHoaAndTreasury(hoa: string, treasuryCode: string): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(`${this.BaseURL}api/v1/HoaTreasurySearch/searchByHoaAndTreasuryCode?Hoa=${hoa}&TreasuryCode=${treasuryCode}`).pipe(
            catchError((error) => {                         
                this.toastService.showError(error.message);
                throw error;
            })
        );
    }
    InsertInterestYearCapture(payload:any): Observable<IapiResponce> {
        return this.http.post<IapiResponce>(this.BaseURL + 'api/v1/InterestYearCapture/ApproveInterestYear', payload).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
}
