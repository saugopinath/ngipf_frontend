import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InitialBalanceCaptureService {

  BaseURL: string = `${environment.BaseURL}`;
  constructor(private http: HttpClient, private toastService: ToastService) {}
 

  getTableData(): Observable<IapiResponce> {
    return this.http.get<IapiResponce>(this.BaseURL +'api/OpenBalCapPfRegSubmission/SanctionAdminAllEmp').pipe(
      catchError((error) => {
        throw this.toastService.showError(error.Message);
      })
    );
  }
}
