import {Component, OnInit} from '@angular/core';
import {AdvertBannerComponent} from "../advert-banner/advert-banner.component";
import {AdvertInfoBlocksComponent} from "../advert-info-blocks/advert-info-blocks.component";
import {AdvertStepsComponent} from "../advert-steps/advert-steps.component";
import {AdvertCloudsComponent} from "../advert-clouds/advert-clouds.component";
import {AdvertFooterComponent} from "../advert-footer/advert-footer.component";
import {HeaderComponent} from "../../../shared/core/components/header/header.component";
import {Meta, Title} from "@angular/platform-browser";

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
export class AdvertComponent implements OnInit {

    constructor(private title: Title, private meta: Meta) {
    }

    ngOnInit(): void {
        this.title.setTitle('Список Побажань - Додайте, Поділіться, Здійсніть! - Wishlist');
        
        const description = 'Створіть свій особистий список побажань на нашому сайті Вішліст! Додавайте побажання та діліться ними з друзями та родиною, а інші користувачі можуть бронювати побажання, щоб допомогти зробити ваші мрії реальністю. Простий спосіб організувати подарунки для будь-якого випадку!';
        this.meta.updateTag({ name: 'description', content: description });
        this.meta.updateTag({ name: 'og:description', content: description });
    }
}
