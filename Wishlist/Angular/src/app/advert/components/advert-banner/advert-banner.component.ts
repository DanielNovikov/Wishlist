import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {GradientButtonComponent} from "../../../shared/core/components/gradient-button/gradient-button.component";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-advert-banner',
  standalone: true,
  imports: [
    GradientButtonComponent
  ],
  templateUrl: './advert-banner.component.html',
  styleUrl: './advert-banner.component.scss'
})
export class AdvertBannerComponent {  
  constructor(private router: Router) {
  }
  
  open() {
    this.router.navigate(['wishlist']);
  }
}
