import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-home-layout-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './home-layout-navbar.component.html',
  styleUrl: './home-layout-navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLayoutNavbarComponent {

}
