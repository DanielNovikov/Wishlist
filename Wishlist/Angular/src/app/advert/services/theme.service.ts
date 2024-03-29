import {Inject, Injectable, makeStateKey, PLATFORM_ID, signal, TransferState, WritableSignal} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {CookieService} from "./cookie.service";
import {Theme} from "../models/theme";

export const themeStateKey = makeStateKey<Theme>('theme');

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public Value : WritableSignal<Theme> = signal<Theme>(Theme.Light);
  
  constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private cookieService: CookieService,
      private transferState: TransferState) {  }
  
  public initialize() {
    if (!isPlatformBrowser(this.platformId)) {
      let cookieTheme = this.cookieService.getEnumCookie<Theme>('theme', Theme) ?? Theme.Light;
      if (cookieTheme) {
        this.Value.set(cookieTheme);
        this.transferState.set<Theme>(themeStateKey, cookieTheme);
      }
    } else {
      if (this.transferState.hasKey(themeStateKey)) {
        this.Value.set(this.transferState.get<Theme>(themeStateKey, Theme.Light));
      } else {
        let theme = localStorage.getItem('theme');
        if (theme != null) {
          this.Value.set(Theme[theme as keyof typeof Theme]);
        }
      }
    }
  }
  
  public toggle() {
    this.Value.update(value => value === Theme.Light ? Theme.Dark : Theme.Light)
    
    if (isPlatformBrowser(this.platformId)) localStorage['theme'] = this.Value();
    this.cookieService.setCookie('theme', this.Value().toString(), 30);
  }
}
