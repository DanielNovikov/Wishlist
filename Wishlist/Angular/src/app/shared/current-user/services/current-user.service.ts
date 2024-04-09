import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { CurrentUserResponse } from "../models/current-user-response";
import { map, Observable, of } from "rxjs";
import { CurrentUserApiService } from "./current-user-api.service";
import { AuthAccessTokenService } from "../../auth/services/auth-access-token.service";

@Injectable({
    providedIn: 'root'
})
export class CurrentUserService {

    public user: WritableSignal<CurrentUserResponse | null> = signal(null);
    public isAuthorized: Signal<boolean> = computed(() => this.user() != null);

    constructor(private currentUserApiService: CurrentUserApiService) {
    }

    load(): Observable<any> {
        return this.currentUserApiService.get().pipe(
            map(response => {
                if (response !== null) this.user.set(response);
            }));
    }
}
