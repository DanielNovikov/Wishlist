import { Routes } from '@angular/router';
import {AdvertComponent} from "./advert/components/advert/advert.component";
import {WishlistLayoutComponent} from "./wishlist/components/pages/wishlist-layout/wishlist-layout.component";
import {WishlistCreateComponent} from "./wishlist/components/pages/wishlist-create/wishlist-create.component";
import {WishlistComponent} from "./wishlist/components/pages/wishlist/wishlist.component";

export const routes: Routes = [
    { path: '', component: AdvertComponent },
    { path: 'wishlist', component: WishlistLayoutComponent, children: [
        { path: '', component: WishlistCreateComponent },
        { path: ':wishlistId', component: WishlistComponent }]},
];
