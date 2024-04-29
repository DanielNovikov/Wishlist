import {Injectable} from '@angular/core';
import {DeviceService} from "./device.service";
import {environment} from "../environments/environment";
import {catchError, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private deviceService: DeviceService, private http: HttpClient) {
    }

    get(url: string, errorValue: any = null, options: any = undefined): Observable<any> {
        return this.http.get(`${this.getBaseUrl()}${url}`, options)
            .pipe(catchError(_ => of(errorValue)));
    }

    post(url: string, body: any, errorValue: any = null, options: any = undefined): Observable<any> {
        return this.http.post(`${this.getBaseUrl()}${url}`, body, options)
            .pipe(catchError(_ => of(errorValue)));
    }

    put(url: string, body: any, errorValue: any = null, options: any = undefined): Observable<any> {
        return this.http.put(`${this.getBaseUrl()}${url}`, body, options)
            .pipe(catchError(_ => of(errorValue)));
    }

    delete(url: string, errorValue: any = null, options: any = undefined): Observable<any> {
        return this.http.delete(`${this.getBaseUrl()}${url}`, options)
            .pipe(catchError(_ => of(errorValue)));
    }

    getBaseUrl() {
        return this.deviceService.isServer() ? environment.serverApiUrl : environment.browserApiUrl;
    }
}
