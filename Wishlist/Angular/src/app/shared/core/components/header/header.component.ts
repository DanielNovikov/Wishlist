import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {TextComponent} from "../text/text.component";
import { ThemeService } from "../../../../advert/services/theme.service";
import { Theme } from '../../../../advert/models/theme';
import { CurrentUserEditService } from "../../../current-user/services/current-user-edit.service";

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
  
  constructor(public themeService: ThemeService, private currentUserEditService: CurrentUserEditService ) {}

  toggleTheme(): void {    
    this.themeService.toggle();
  }
  
  openCurrentUserEditModal() {
    this.currentUserEditService.open();
  }

  protected readonly Theme = Theme;
}
