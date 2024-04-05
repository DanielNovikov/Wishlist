import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../../shared/components/header/header.component";
import {HomeLayoutNavbarComponent} from "../home-layout-navbar/home-layout-navbar.component";

@Component({
  selector: 'app-home-layout',
  standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent,
        HomeLayoutNavbarComponent
    ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLayoutComponent {

}
