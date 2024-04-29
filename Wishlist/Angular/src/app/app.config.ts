import {APP_INITIALIZER, ApplicationConfig, isDevMode} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import { CurrentUserService } from "./shared/current-user/services/current-user.service";
import { authInterceptor } from "./shared/core/services/interceptors/auth.interceptor";
import { AuthAccessTokenService } from "./shared/auth/services/auth-access-token.service";
import { of } from "rxjs";
import {ThemeService} from "./shared/core/services/theme.service";


export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
        provideClientHydration(),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        }),
        {
            provide: APP_INITIALIZER,
            useFactory: (themeService: ThemeService) => {
                return () => themeService.initialize()
            },
            deps: [ThemeService],
            multi: true
        },
        {
            provide: APP_INITIALIZER,
            useFactory: (currentUserService: CurrentUserService, authAccessTokenService: AuthAccessTokenService) => {
                return () => {
                    const accessToken = authAccessTokenService.init();
                    if (accessToken) {
                        return currentUserService.load();
                    } else {
                        return of();
                    }
                };
            },
            deps: [CurrentUserService, AuthAccessTokenService],
            multi: true
        }
    ]
};
