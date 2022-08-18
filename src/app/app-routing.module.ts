import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuard } from './auth/adminAuth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { AuthComponent } from './auth/auth.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { Booking } from './booking/booking.component';
import { carDetailsComponent } from './carDetails/carDetilas.component';
import { Customers } from './customer/customer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: AuthComponent, pathMatch: 'full' },
  { path: "header", canActivate: [AuthGuard], component: HeaderComponent },
  { path: 'customers', canActivate: [AuthGuard], component: Customers },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent, pathMatch: 'full' },
  { path: 'booking', canActivate: [AuthGuard], component: Booking },
  { path: 'bookingDetails', canActivate: [AuthGuard], component: BookingDetailsComponent },
  { path: 'carDetails', canActivate: [AuthGuard], component: carDetailsComponent },
  { path: 'admin', canActivate: [AdminAuthGuard], component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
