import { Component } from '@angular/core';
import {AdvertHeaderComponent} from "../advert-header/advert-header.component";
import {AdvertBannerComponent} from "../advert-banner/advert-banner.component";
import {AdvertInfoBlocksComponent} from "../advert-info-blocks/advert-info-blocks.component";
import {AdvertStepsComponent} from "../advert-steps/advert-steps.component";
import {AdvertCloudsComponent} from "../advert-clouds/advert-clouds.component";
import {AdvertFooterComponent} from "../advert-footer/advert-footer.component";

@Component({
  selector: 'app-advert',
  standalone: true,
  imports: [
    AdvertHeaderComponent,
    AdvertBannerComponent,
    AdvertInfoBlocksComponent,
    AdvertStepsComponent,
    AdvertCloudsComponent,
    AdvertFooterComponent
  ],
  templateUrl: './advert.component.html',
  styleUrls: ['./advert.component.scss']
})
export class AdvertComponent {

}
