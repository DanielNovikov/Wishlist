import { Routes } from '@angular/router';
import {AdvertComponent} from "./advert/components/advert/advert.component";
import {WishlistComponent} from "./wishlist/components/wishlist/wishlist.component";

export const routes: Routes = [
    { path: '', component: AdvertComponent },
    { path: 'wishlist', component: WishlistComponent}
];
