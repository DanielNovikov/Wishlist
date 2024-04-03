import {APP_INITIALIZER, ApplicationConfig, isDevMode} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import {ThemeService} from "./advert/services/theme.service";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {AuthService} from "./auth/services/auth.service";
import {authInterceptor} from "./shared/interceptors/auth.interceptor";

export function initializeTheme(themeService: ThemeService) {
    return () => new Promise<void>((resolve) => {
        themeService.initialize();
        resolve();
    });
}

export function initializeCurrentUser(authService: AuthService) {
    return () => authService.loadCurrentUser();
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        provideClientHydration(),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        {
            provide: APP_INITIALIZER,
            useFactory: initializeTheme,
            deps: [ThemeService],
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: initializeCurrentUser,
            deps: [AuthService],
            multi: true
        },
        ThemeService,
        AuthService
    ]
};
