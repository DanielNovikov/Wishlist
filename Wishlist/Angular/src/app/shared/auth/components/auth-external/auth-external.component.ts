import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {AuthExternalTelegramComponent} from "../auth-external-telegram/auth-external-telegram.component";
import { TextComponent } from "../../../core/components/text/text.component";
import { DeviceService } from "../../../core/services/device.service";

@Component({
  selector: 'app-auth-external',
  standalone: true,
  imports: [
    TextComponent,
    AuthExternalTelegramComponent
  ],
  templateUrl: './auth-external.component.html',
  styleUrl: './auth-external.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthExternalComponent {

  @Output() onAuthenticated: EventEmitter<void> = new EventEmitter<void>();
  
  constructor(protected deviceService: DeviceService) {
  }
  
}
