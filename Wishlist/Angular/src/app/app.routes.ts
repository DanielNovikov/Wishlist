import { Routes } from '@angular/router';
import {AdvertComponent} from "./advert/components/advert/advert.component";
import { WishlistCreateComponent } from "./wishlist/components/wishlist-create/wishlist-create.component";
import { WishlistLayoutComponent } from "./wishlist/components/wishlist-layout/wishlist-layout.component";
import { WishlistComponent } from "./wishlist/components/wishlist/wishlist.component";

export const routes: Routes = [
    { path: '', component: AdvertComponent },
    { path: 'wishlist', component: WishlistLayoutComponent, children: [
        { path: '', component: WishlistCreateComponent },
        { path: ':wishlistId', component: WishlistComponent }]},
];
