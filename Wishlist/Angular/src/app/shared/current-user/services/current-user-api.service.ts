import { Injectable } from '@angular/core';
import { environment } from "../../core/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { CurrentUserResponse } from "../models/current-user-response";
import { CurrentUserEditResponse } from "../models/current-user-edit-response";
import { CurrentUserEditRequest } from "../models/current-user-edit-request";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserApiService {

  private baseUrl: string = environment.apiUrl + 'current-user';

  constructor(private httpClient: HttpClient) {
  }

  get(): Observable<CurrentUserResponse | null> {
    return this.httpClient.get<CurrentUserResponse>(this.baseUrl)
        .pipe(catchError(error => of(null)));
  }
  
  getEdit(): Observable<CurrentUserEditResponse | null> {
    return this.httpClient.get<CurrentUserEditResponse>(this.baseUrl + '/edit')
        .pipe(catchError(error => of(null)));
  } 
  
  edit(request: CurrentUserEditRequest): Observable<CurrentUserResponse | null> {
    return this.httpClient.post<CurrentUserEditResponse>(this.baseUrl + '/edit', request)
        .pipe(catchError(error => of(null)));
  } 
}
