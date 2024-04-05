import { Routes } from '@angular/router';
import {AdvertComponent} from "./advert/components/advert/advert.component";
import {authGuard} from "./shared/guards/auth.guard";
import {HomeLayoutComponent} from "./home/components/home-layout/home-layout.component";
import {IdeasComponent} from "./home/components/ideas/ideas/ideas.component";
import {WishlistComponent} from "./wishlist/components/wishlist/wishlist.component";

export const routes: Routes = [
    { path: '', component: AdvertComponent },
    { path: '', component: HomeLayoutComponent, canActivate: [authGuard], children: [
        { path: 'wishlist', component: WishlistComponent },
        { path: 'ideas', component: IdeasComponent }]}
];
