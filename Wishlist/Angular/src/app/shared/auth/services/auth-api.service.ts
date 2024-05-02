import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { AuthResponse } from "../models/auth-response";
import { AuthSignInByEmailRequest } from "../models/auth-sign-in-by-email-request";
import { AuthSignUpByEmailRequest } from "../models/auth-sign-up-by-email-request";
import { AuthSignInByTelegramRequest } from "../models/auth-sign-in-by-telegram-request";
import { environment } from "../../core/environments/environment";
import {ApiService} from "../../core/services/api.service";

@Injectable({
    providedIn: 'root'
})
export class AuthApiService {
    constructor(private api: ApiService) {
    }

    signInByEmail(request: AuthSignInByEmailRequest): Observable<AuthResponse | null> {
        return this.api.post('auth/email/sign-in', request);
    }

    signUpByEmail(request: AuthSignUpByEmailRequest): Observable<AuthResponse | null> {
        return this.api.post('auth/email/sign-up', request);
    }

    signInByTelegram(query: string, request: AuthSignInByTelegramRequest): Observable<AuthResponse | null> {
        return this.api.post(`auth/telegram?${query}`, request);
    }
}
