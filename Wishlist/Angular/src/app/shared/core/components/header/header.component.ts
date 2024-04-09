import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {TextComponent} from "../text/text.component";
import { ThemeService } from "../../../../advert/services/theme.service";
import { Theme } from '../../../../advert/models/theme';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    TextComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() title: string | undefined;
  
  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {    
    this.themeService.toggle();
  }

  protected readonly Theme = Theme;
}
