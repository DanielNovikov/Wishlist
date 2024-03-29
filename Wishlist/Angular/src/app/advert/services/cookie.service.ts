import {Inject, Injectable, Optional} from '@angular/core';
import {REQUEST} from "@nguniversal/express-engine/tokens";

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  constructor(@Optional() @Inject(REQUEST) private request: any) { }

  setCookie(name: string, value: string, days?: number) {
    let expires = "";
    if (days != null) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  getEnumCookie<T>(name: string, enumType: any): T | null {
    const cookieValue = this.getCookie(name);
    if (cookieValue === null) {
      return null;
    }

    if (typeof enumType[cookieValue as keyof typeof enumType] === 'number') {
      return enumType[cookieValue as keyof typeof enumType] as T;
    }

    for (let key in enumType) {
      if (enumType[key] === cookieValue) {
        return enumType[key] as T;
      }
    }

    return null;
  }

  deleteCookie(name: string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }
}
