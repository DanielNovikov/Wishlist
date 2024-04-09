import { Component } from '@angular/core';
import {AdvertBannerComponent} from "../advert-banner/advert-banner.component";
import {AdvertInfoBlocksComponent} from "../advert-info-blocks/advert-info-blocks.component";
import {AdvertStepsComponent} from "../advert-steps/advert-steps.component";
import {AdvertCloudsComponent} from "../advert-clouds/advert-clouds.component";
import {AdvertFooterComponent} from "../advert-footer/advert-footer.component";
import {HeaderComponent} from "../../../shared/core/components/header/header.component";

@Component({
  selector: 'app-advert',
  standalone: true,
  imports: [
    HeaderComponent,
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
