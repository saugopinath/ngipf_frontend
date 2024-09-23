import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NumberInput } from '@angular/cdk/coercion';

@Injectable({
  providedIn: 'root'
})
export class InitialBalancePFDAdminService {
  BaseURL: string = `${environment.BaseURL}`;
  constructor(private http: HttpClient, private toastService: ToastService) {}
 

  getTableData(hoa:number,treasury:number,pfdAdmin:NumberInput): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL + `api/v1/OpenBalView/GetAllPfdAdminOpBal?HOA=${hoa}&treasury=${treasury}&PfdAdmin=${pfdAdmin}`, ).pipe(
        catchError((error) => {
            throw this.toastService.showError(error.Message);
        })
    );
}
}
