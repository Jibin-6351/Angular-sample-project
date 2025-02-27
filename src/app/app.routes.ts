import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { CarddetailsComponent } from './carddetails/carddetails.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'addmovie', component: AddmovieComponent },
  { path: 'movies/:id', component: CarddetailsComponent }
];
