import {effect, Inject, Injectable, PLATFORM_ID, signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {Theme} from "../models/theme";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  public Value : WritableSignal<Theme> = signal<Theme>(Theme.Light);
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      effect(() => {
        document.body.setAttribute('is-light-theme', (this.Value() == Theme.Light).toString());
      });
    }
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
  }
}
