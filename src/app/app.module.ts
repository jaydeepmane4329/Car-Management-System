import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { TableModule } from 'primeng/table';
import { Customers } from './customer/customer.component';
import { ChartComponent } from './chart/chart.component';
import { Booking } from './booking/booking.component';
import { carDetailsComponent } from './carDetails/carDetilas.component';
import {HttpClientModule} from '@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



@NgModule({
  declarations: [AppComponent, AuthComponent, HeaderComponent, DropdownDirective, Customers, ChartComponent, Booking,carDetailsComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, TableModule,HttpClientModule,BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
