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

    getRemoteData(url: string, param?: any, queryParams?: any): Observable<any[]> {
        const apiURL = param ? `${this.baseUrl}${url}/${param}${queryParams}` : `${this.baseUrl}${url}${queryParams}`;
        return this.http.get<any[]>(apiURL);
    }

    postRemoteData(url: string, bodyParam?: any, param?: any): Observable<any[]> {
        const apiURL = param ? `${this.baseUrl}${url}/${param}` : `${this.baseUrl}${url}`;
        return this.http.post<any[]>(apiURL, bodyParam);
    }

    updateDataToControl(data: any[]): void {
        this.remoteData.next(data);
    }

}
