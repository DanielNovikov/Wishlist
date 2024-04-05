import {Component} from '@angular/core';
import {NgClass} from "@angular/common";
import {ThemeService} from "../../../advert/services/theme.service";
import { Theme } from '../../../advert/models/theme';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {    
    this.themeService.toggle();
  }

  protected readonly Theme = Theme;
}
