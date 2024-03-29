import { Routes } from '@angular/router';
import {AdvertComponent} from "./advert/components/advert/advert.component";
import {MainComponent} from "./main/shared/main/main.component";
import {HomeComponent} from "./main/components/home/home.component";

export const routes: Routes = [
    { path: '', component: AdvertComponent, pathMatch: 'full'},
    { path: 'home', component: MainComponent, children: [
        { path: '', component: HomeComponent, pathMatch: 'full' }]}
];
