import { Routes } from '@angular/router';
import {AdvertComponent} from "./advert/components/advert/advert.component";
import {authGuard} from "./shared/guards/auth.guard";
import {HomeLayoutComponent} from "./home/components/home-layout/home-layout.component";
import {WishlistComponent} from "./home/components/wishlist/wishlist/wishlist.component";
import {IdeasComponent} from "./home/components/ideas/ideas/ideas.component";

export const routes: Routes = [
    { path: '', component: AdvertComponent },
    { path: '', component: HomeLayoutComponent, canActivate: [authGuard], children: [
        { path: 'wishlist', component: WishlistComponent },
        { path: 'ideas', component: IdeasComponent }]}
];
