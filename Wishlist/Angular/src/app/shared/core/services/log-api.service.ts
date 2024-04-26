import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {LogFormRequest} from "../models/log-form-request";

@Injectable({
  providedIn: 'root'
})
export class LogApiService {
  private baseUrl: string = environment.apiUrl + 'log';

  constructor(private httpClient: HttpClient) {
  }

  logForm(request: LogFormRequest): Observable<any> {
    return this.httpClient.post(this.baseUrl + '/form', request)
        .pipe(catchError(error => of()));
  }
}
