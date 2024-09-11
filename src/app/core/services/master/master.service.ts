import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from '../toast.service';
import { IapiResponce } from '../../models/iapi-responce';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { error } from 'console';
import { Message } from 'primeng/api';
@Injectable({
    providedIn: 'root',
})
export class MasterService {
    BaseURL: string = `${environment.BaseURL}`;
    constructor(private http: HttpClient, private toastService: ToastService) { }

    getHoa(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Master/get-hoa').pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
    getPfdAdminByHoa(hoa: number): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Master/get-LfplDdoMap?int_hoa_id=' + hoa).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }

       

 
    
}
