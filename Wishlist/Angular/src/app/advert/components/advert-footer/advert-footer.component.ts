import { Component } from '@angular/core';

@Component({
  selector: 'app-advert-footer',
  standalone: true,
  imports: [],
  templateUrl: './advert-footer.component.html',
  styleUrl: './advert-footer.component.scss'
})
export class AdvertFooterComponent {

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  
}
