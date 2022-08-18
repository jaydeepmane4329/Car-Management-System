import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Bookings } from '../shared/booking.mode';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class BokkingService {
  value: any;

  editDataValidation = new ReplaySubject<boolean>();

  constructor(private dataService: DataService) { }


  getBookings() {
    return this.dataService.getBookingDetails();
  }

  postBookings(data: any) {
    return this.dataService.postBookingDetails(data);
  }

  editBookings(id: any) {
    return this.dataService.editBooking(id)
  }

  deleteBooking(id: any) {
    return this.dataService.deleteBooking(id)
  }

  allowBooking(id: any) {
    return this.dataService.allowUserBooking(id);
  }

  rejectBooking(id: any) {
    return this.dataService.rejectUserBooking(id);
  }
}
