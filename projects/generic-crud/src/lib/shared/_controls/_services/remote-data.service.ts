import { Injectable, Inject, wtfStartTimeRange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { AbstractControl } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class RemoteDataService {

    private remoteData: Subject<any[]> = new Subject<any[]>();
    public remoteData$ = this.remoteData.asObservable();

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string
    ) { }

    getRemoteData(url: string, param?: any, queryParams?: any): Observable<any[]> {
        const apiURL = this.parseURL(url, param, queryParams);
        return this.http.get<any[]>(apiURL);
    }

    postRemoteData(url: string, bodyParam?: any, queryParams?: any): Observable<any[]> {
        const apiURL = this.parseURL(url, null, queryParams);
        return this.http.post<any[]>(apiURL, bodyParam);
    }

    updateDataToControl(data: any[]): void {
        this.remoteData.next(data);
    }

    parseQueryParams(paramKeys: any[], control: AbstractControl): string {
        if (paramKeys && paramKeys.length) {
            let params = '?';
            for (const paramKey of paramKeys) {
                const frmCtrl = control.root.get(paramKey);
                params += `${paramKey}=${(frmCtrl && frmCtrl.value ? frmCtrl.value : null)}`;
            }
            return params;
        } else {
            return '';
        }
    }

    private parseURL(url: string, param: any, queryParams: any): string {
        if (url) {
            url = `${this.baseUrl}${url}`;
            if (param) {
                url = `${url}/${param}`;
            }

            if (queryParams) {
                url = `${url}${queryParams}`;
            }
        }
        return url;
    }

}
