import { Component } from '@angular/core';
import {ModalService} from "../../../shared/services/modal.service";
import {SignInComponent} from "../../../auth/components/sign-in/sign-in.component";
import {GradientButtonComponent} from "../../../shared/components/gradient-button/gradient-button.component";

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
  
  constructor(private modalService: ModalService) {
  }
  
  open() {
    this.modalService.openModal(SignInComponent).subscribe(() => console.log('Closed'));
  }

}
