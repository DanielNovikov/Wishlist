import { Injectable } from '@angular/core';
import { environment } from "../../core/environments/environment";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { CurrentUserResponse } from "../models/current-user-response";
import { CurrentUserEditResponse } from "../models/current-user-edit-response";
import { CurrentUserEditRequest } from "../models/current-user-edit-request";
import {ApiService} from "../../core/services/api.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserApiService {
  constructor(private api: ApiService) {
  }

  get(): Observable<CurrentUserResponse | null> {
    return this.api.get('current-user');
  }
  
  getEdit(): Observable<CurrentUserEditResponse | null> {
    return this.api.get('current-user/edit');
  } 
  
  edit(request: CurrentUserEditRequest): Observable<CurrentUserResponse | null> {
    return this.api.post('current-user/edit', request);
  } 
}
