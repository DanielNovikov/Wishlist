import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {AuthResponse} from "../models/auth-response";
import {environment} from "../../shared/environments/environment";
import {AuthSignInByEmailRequest} from "../models/auth-sign-in-by-email-request";
import {AuthSignUpByEmailRequest} from "../models/auth-sign-up-by-email-request";
import {AuthUserResponse} from "../models/auth-user-response";
import {AuthSignInByTelegramRequest} from "../models/auth-sign-in-by-telegram-request";

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  private baseUrl: string = environment.apiUrl + 'auth/';
  
  constructor(private httpClient: HttpClient) { }

  getCurrentUser() : Observable<AuthUserResponse | null> {
    return this.httpClient.get<AuthUserResponse>(this.baseUrl + 'current-user')
        .pipe(catchError(error => of(null)));
  }
  
  signInByEmail(request: AuthSignInByEmailRequest) : Observable<AuthResponse | null> {
    return this.httpClient.post<AuthResponse>(this.baseUrl + 'email/sign-in', request)
        .pipe(catchError(error => of(null)));
  }

  signUpByEmail(request: AuthSignUpByEmailRequest) : Observable<AuthResponse | null> {
    return this.httpClient.post<AuthResponse>(this.baseUrl + 'email/sign-up', request)
        .pipe(catchError(error => of(null)));
  }
  
  signInByTelegram(request: AuthSignInByTelegramRequest) : Observable<AuthResponse | null> {
    return this.httpClient.post<AuthResponse>(this.baseUrl + 'telegram', request)
        .pipe(catchError(error => of(null)));
  }
}
