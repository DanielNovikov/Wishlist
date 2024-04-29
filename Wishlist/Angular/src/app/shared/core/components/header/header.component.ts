import {Component, Input} from '@angular/core';
import {NgClass} from "@angular/common";
import {TextComponent} from "../text/text.component";
import { CurrentUserEditService } from "../../../current-user/services/current-user-edit.service";
import { CurrentUserService } from "../../../current-user/services/current-user.service";
import {Router} from "@angular/router";
import {ThemeService} from "../../services/theme.service";
import { Theme } from '../../models/theme';

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
  
  constructor(
      public themeService: ThemeService,
      public currentUserService: CurrentUserService,
      private currentUserEditService: CurrentUserEditService,
      private router: Router) {}

  toggleTheme(): void {    
    this.themeService.toggle();
  }
  
  openCurrentUserEditModal() {
    this.currentUserEditService.open();
  }
  
  onLogoClicked() {
    this.router.navigate(['/']);
  }

  protected readonly Theme = Theme;
}
