import { ChangeDetectionStrategy, Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../../shared/components/header/header.component";

@Component({
  selector: 'app-home-layout',
  standalone: true,
    imports: [
        RouterOutlet,
        HeaderComponent
    ],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeLayoutComponent {

}
