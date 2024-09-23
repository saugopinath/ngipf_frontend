import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';

@Injectable({
  providedIn: 'root'
})
export class MonthlysalaryService {

  BaseURL: string = `${environment.BaseURL}`;
    constructor(private http: HttpClient, private toastService: ToastService) {}

    getMonthlySalary(year : string): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/MonthlySalView/GetAllMonthlySalary?salary_year='+ year).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
}
