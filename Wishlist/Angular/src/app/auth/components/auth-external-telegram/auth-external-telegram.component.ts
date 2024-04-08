import {AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AuthSignInByTelegramRequest} from "../../models/auth-sign-in-by-telegram-request";
import {DeviceService} from "../../../shared/services/device.service";
import {DOCUMENT} from "@angular/common";
import {Destroyable} from "../../../shared/models/destroyable";
import {takeUntil} from "rxjs";

@Component({
  selector: 'app-auth-external-telegram',
  standalone: true,
  imports: [],
  templateUrl: './auth-external-telegram.component.html',
  styleUrl: './auth-external-telegram.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthExternalTelegramComponent extends Destroyable implements AfterViewInit {

  @Output() onAuthenticated: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(
      private authService: AuthService,
      private deviceService: DeviceService,
      @Inject(DOCUMENT) private document: Document) {
    super();
  }
  
  ngAfterViewInit(): void {
    if (this.deviceService.isBrowser() && !this.deviceService.isIos())
      this.initializeTelegramLogin();
  }

  signIn() {
    // @ts-ignore
    const telegram = window.Telegram;
    console.log(telegram);
    if (!telegram) return;

    telegram.Login.auth({ bot_id: '7095935175', request_access: true },
      (data: any) => {
        if (!data) return;

        const query = new Map<string, string>();
        Object.keys(data).forEach(key => {
          query.set(key, data[key]);
        });
        
        const request: AuthSignInByTelegramRequest = {
          id: data["id"],
          query: query,
          firstName: data["first_name"],
          lastName: data["last_name"]
        }

        this.authService.signInByTelegram(request)
          .pipe(takeUntil(this.destroy$))
          .subscribe(success => {
            if (success){
              this.onAuthenticated.emit();
            }})
          });
  }
  
  initializeTelegramLogin() {
    const script = this.document.createElement('script')
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?3';
    script.setAttribute('data-telegram-login', 'my_wishlist_ua_bot');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-auth-url', '/telegram/callback');
    script.setAttribute('data-request-access', 'write');
    script.setAttribute('class', 'telegram-login-widget');

    this.document.getElementsByClassName("telegram-login-placeholder")[0].append(script);
  }
  
}
