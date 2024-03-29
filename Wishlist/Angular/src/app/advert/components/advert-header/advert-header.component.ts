import {Component, OnInit} from '@angular/core';
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
export class AdvertHeaderComponent implements OnInit {

  protected theme: Theme = Theme.Light;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.themeService.initialize();
  }

  toggleTheme(): void {    
  }
  
  setTheme(theme: boolean) {
    // document.body.setAttribute('is-light-theme', this.isLightTheme.toString());
  }

  protected readonly Theme = Theme;
}
