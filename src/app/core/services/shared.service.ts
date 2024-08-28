import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor() {}
    private dataSubject = new ReplaySubject<any>(1);

    getData() {
        return this.dataSubject.asObservable();
    }

    updateData(data: any) {
        this.dataSubject.next(data);
    }
}
