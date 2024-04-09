import { Injectable } from '@angular/core';
import { AuthApiService } from "./auth-api.service";
import { AuthSignInByEmailRequest } from "../models/auth-sign-in-by-email-request";
import { map, Observable } from "rxjs";
import { AuthResponse } from "../models/auth-response";
import { AuthSignUpByEmailRequest } from "../models/auth-sign-up-by-email-request";
import { AuthSignInByTelegramRequest } from "../models/auth-sign-in-by-telegram-request";
import { AuthAccessTokenService } from "./auth-access-token.service";
import { CurrentUserService } from "../../current-user/services/current-user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(
        private authApiService: AuthApiService,
        private authAccessTokenService: AuthAccessTokenService,
        private currentUserService: CurrentUserService) {
    }

    signInByEmail(request: AuthSignInByEmailRequest): Observable<boolean> {
        return this.authApiService.signInByEmail(request).pipe(
            map(response => this.authenticate(response)));
    }

    signUpByEmail(request: AuthSignUpByEmailRequest): Observable<boolean> {
        return this.authApiService.signUpByEmail(request).pipe(
            map(response => this.authenticate(response)));
    }

    signInByTelegram(request: AuthSignInByTelegramRequest): Observable<boolean> {
        return this.authApiService.signInByTelegram(request).pipe(
            map(response => this.authenticate(response)));
    }

    private authenticate(response: AuthResponse | null): boolean {
        if (response == null) return false;

        this.authAccessTokenService.set(response.authToken);
        this.currentUserService.user.set(response.user);
        
        return true;
    }
}
