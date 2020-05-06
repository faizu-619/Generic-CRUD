import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class RemoteDataService {

    private remoteData: Subject<any[]> = new Subject<any[]>();
    public remoteData$ = this.remoteData.asObservable();

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string
    ) { }

    getRemoteData(url: string, param?: any): Observable<any[]> {
        const apiURL = param ? `${this.baseUrl}${url}/${param}` : `${this.baseUrl}${url}`;
        return this.http.get<any[]>(apiURL);
    }

    updateDataToControl(data: any[]): void {
        this.remoteData.next(data);
    }

}
