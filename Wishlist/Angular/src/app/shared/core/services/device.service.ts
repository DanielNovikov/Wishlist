import {Inject, Injectable, PLATFORM_ID, signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser, isPlatformServer} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }
  
  isServer() {
    return isPlatformServer(this.platformId);
  }
  
  isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
  
  isIos() {
    if (this.isServer()) return true;
    
    return /iphone|ipad|ipod/i.test(navigator.userAgent);
  }
}
