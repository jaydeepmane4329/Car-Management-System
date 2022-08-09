import { Injectable } from '@angular/core';
import { Bookings } from '../shared/booking.mode';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class BokkingService {
  value: any;

  constructor(private dataService: DataService) { }


  getBookings() {
    return this.dataService.getBookingDetails();
  }

  postBookings(data: any) {
    return this.dataService.postBookingDetails(data);
  }
}
