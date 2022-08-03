import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { Booking } from './booking/booking.component';
import { carDetailsComponent } from './carDetails/carDetilas.component';
import { ChartComponent } from './chart/chart.component';
import { Customers } from './customer/customer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
   { path:"header", component:HeaderComponent},
  { path: 'customers', component: Customers },
  { path: 'home', component: HomeComponent },
  { path: 'chart', component: ChartComponent },
  {path:'booking',component:Booking},
  {path:'carDetails',component:carDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
