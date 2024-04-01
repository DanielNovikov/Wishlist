import {Component} from '@angular/core';
import {NgClass} from "@angular/common";
import {Theme} from "../../models/theme";
import {ThemeService} from "../../services/theme.service";

@Component({
  selector: 'app-advert-header',
  standalone: true,
  imports: [
    NgClass    
  ],
  templateUrl: './advert-header.component.html',
  styleUrl: './advert-header.component.scss'
})
export class AdvertHeaderComponent {

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {    
    this.themeService.toggle();
  }

  protected readonly Theme = Theme;
}
