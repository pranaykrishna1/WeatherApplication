import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import {WeatherInfoComponent} from "./weather-info/weather-info.component";
import {NgModule} from "@angular/core";

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path : 'weather-info',
        component : WeatherInfoComponent
    },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

// @NgModule({
//     imports: [RouterModule.forRoot(appRoutes)],
//     exports: [RouterModule]
// })
export const routing = RouterModule.forRoot(appRoutes);
