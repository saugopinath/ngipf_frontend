import { Subject, Observable } from 'rxjs';

export class dataPipeBase<T> {
    protected subject: Subject<T> = new Subject<T>();
    constructor(protected _source: Observable<any>) {
        this.reload();
    }
    reload(): void {
        this._source.subscribe((res) => {
            this.subject.next(res);
        });
    }
    get wire(): Observable<T> {
        return this.subject;
    }
    set value(v: T) {
        this.subject.next(v);
    }
}

export class dataPipe<T> extends dataPipeBase<T> {}
