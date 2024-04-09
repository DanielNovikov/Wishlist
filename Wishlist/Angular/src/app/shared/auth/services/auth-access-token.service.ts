import { Injectable, signal, WritableSignal } from '@angular/core';
import { DeviceService } from "../../core/services/device.service";

@Injectable({
    providedIn: 'root'
})
export class AuthAccessTokenService {

    value: WritableSignal<string | null> = signal(null);

    constructor(private deviceService: DeviceService) {
    }

    init(): string | null {
        if (this.deviceService.isBrowser()) {
            const accessToken = localStorage['accessToken'];
            if (accessToken) {
                this.value.set(accessToken);
                return accessToken;
            }
        }

        return null;
    }

    set(accessToken: string) {
        if (this.deviceService.isBrowser()) {
            localStorage['accessToken'] = accessToken;
        }

        this.value.set(accessToken);
    }
}
