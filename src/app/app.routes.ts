import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"", component: NavbarComponent}
];
