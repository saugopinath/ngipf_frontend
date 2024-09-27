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
    getallTresury(): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Master/get-treasuries').pipe(
            catchError((error) => {
                //console.log(error);
                throw this.toastService.showError(error.Message);
            })
        );
    }
    getTresuryByHoa(hoa: number): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Master/get-ngipf-treasuries?int_hoa_id=' + hoa).pipe(
            catchError((error) => {
                //console.log(error);
                throw this.toastService.showError(error.Message);
            })
        );
    }
   
    getPfdAdminByHoaandTresury(tresuryId: number,hoa: number): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Master/get-ngipf-pfdadmin?int_hoa_id=' + hoa+'&int_treasury_id='+tresuryId).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
    getStatusMaster(masterType: number): Observable<IapiResponce> {
        return this.http.get<IapiResponce>(this.BaseURL + 'api/v1/Master/get-status-master?master_type_id=' + masterType).pipe(
            catchError((error) => {
                throw this.toastService.showError(error.Message);
            })
        );
    }
       

 
    
}
