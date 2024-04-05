import { ChangeDetectionStrategy, Component } from '@angular/core';
import {TextComponent} from "../../../shared/components/text/text.component";
import {AuthExternalTelegramComponent} from "../auth-external-telegram/auth-external-telegram.component";
import {DeviceService} from "../../../shared/services/device.service";

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

  constructor(protected deviceService: DeviceService) {
  }
  
}
