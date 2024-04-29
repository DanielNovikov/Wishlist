import { Injectable } from '@angular/core';
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {LogFormRequest} from "../models/log-form-request";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class LogApiService {
  constructor(private api: ApiService) {
  }

  logForm(request: LogFormRequest): Observable<any> {
    return this.api.post('form', request, null);
  }
}
