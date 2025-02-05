import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookingComponent } from './booking/booking.component';
import { AboutComponent } from './about/about.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AddmovieComponent } from './addmovie/addmovie.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'about', component: AboutComponent },
  {path:'sign-in', component:SignInComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'addmovie',component:AddmovieComponent}
];
