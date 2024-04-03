import { Routes } from '@angular/router';
import {AdvertComponent} from "./advert/components/advert/advert.component";
import {MainComponent} from "./main/shared/main/main.component";
import {HomeComponent} from "./main/components/home/home.component";
import {authGuard} from "./shared/guards/auth.guard";

export const routes: Routes = [
    { path: '', component: AdvertComponent },
    { path: 'home', component: MainComponent, canActivate: [authGuard], children: [
        { path: '', component: HomeComponent }]}
];
