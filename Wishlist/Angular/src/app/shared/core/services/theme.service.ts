import {effect, Inject, Injectable, PLATFORM_ID, signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {Meta} from "@angular/platform-browser";
import {Theme} from "../models/theme";

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    public Value: WritableSignal<Theme> = signal<Theme>(Theme.Light);

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private meta: Meta) {
    }

    public initialize() {
        if (isPlatformBrowser(this.platformId)) {
            let theme = localStorage.getItem('theme');
            if (theme != null) {
                this.Value.set(Theme[theme as keyof typeof Theme]);
            }
        }
    }

    public toggle() {
        this.Value.update(value => value === Theme.Light ? Theme.Dark : Theme.Light)
        localStorage['theme'] = this.Value();
    
        if (this.Value() === Theme.Light) {
            this.meta.updateTag({ name: 'theme-color', content: '#f9f9f9' });
            this.meta.updateTag({ name: 'background-color', content: '#f9f9f9' });
        } else {
            this.meta.updateTag({ name: 'theme-color', content: '#1A1729' });
            this.meta.updateTag({ name: 'background-color', content: '#1A1729' });
        }
    }
}
