import { computed, Inject, Injectable, PLATFORM_ID, Signal, signal, WritableSignal } from '@angular/core';
import { AuthApiService } from "./auth-api.service";
import { AuthUserResponse } from "../models/auth-user-response";
import { AuthSignInByEmailRequest } from "../models/auth-sign-in-by-email-request";
import { map, Observable, of } from "rxjs";
import { AuthResponse } from "../models/auth-response";
import { AuthSignUpByEmailRequest } from "../models/auth-sign-up-by-email-request";
import { isPlatformBrowser } from "@angular/common";
import { AuthSignInByTelegramRequest } from "../models/auth-sign-in-by-telegram-request";
import { DeviceService } from "../../shared/services/device.service";
import { ModalService } from "../../shared/services/modal.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private authApiService: AuthApiService, private deviceService: DeviceService) {
    }

    public currentUser: WritableSignal<AuthUserResponse | null> = signal(null);
    public isAuthorized: Signal<boolean> = computed(() => this.currentUser() != null);
    public accessToken: WritableSignal<string | null> = signal(null);

    loadCurrentUser(): Observable<any> {
        if (this.deviceService.isBrowser()) {
            const accessToken = localStorage['accessToken']
            if (accessToken) {
                this.accessToken.set(accessToken);

                return this.authApiService.getCurrentUser().pipe(
                    map(response => {
                        if (response !== null) this.currentUser.set(response);
                    }));
            }
        }

        return of();
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

        localStorage['accessToken'] = response.authToken;
        this.currentUser.set(response.user);
        this.accessToken.set(response.authToken);
        return true;
    }
}
