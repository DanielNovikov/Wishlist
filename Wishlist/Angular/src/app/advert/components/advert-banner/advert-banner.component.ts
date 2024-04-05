import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../../shared/services/modal.service";
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";
import {AuthComponent} from "../../../auth/components/auth/auth.component";
import {Subscription} from "rxjs";
import {AuthService} from "../../../auth/services/auth.service";
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
export class AdvertBannerComponent implements OnDestroy {
  private openModalSubscription: Subscription | undefined;
  
  constructor(private modalService: ModalService, private authService: AuthService, private router: Router) {
    setTimeout(() => this.open(), 0);
  }
  
  open() {
    if (this.authService.isAuthorized()) {
      this.router.navigate(['home']);
    } else {
      this.openModalSubscription = this.modalService.openModal(AuthComponent).subscribe();
    }
  }

  ngOnDestroy(): void {
    this.openModalSubscription?.unsubscribe();
  }
}
