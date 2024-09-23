import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  
  BaseURL: string = `${environment.BaseURL}`;
  constructor(private http: HttpClient, private toastService: ToastService) {}

  getState(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/StateMaster/GetAllState').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
  
  getDistict(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/DistrictMaster/GetAllDistrict').pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
  }
  
}
