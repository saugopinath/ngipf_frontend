import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BasicDtlServiceService {

  BaseURL: string = `${environment.BaseURL}`;
  constructor(private http: HttpClient, private toastService: ToastService) {}

  getGender(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/GenderMaster/GetAllGender').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
  getMaritalStatus(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/MaritalStatusMaster/GetAllMaritalStatus').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
  getReligion(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/ReligionMaster/GetAllReligion').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
}

