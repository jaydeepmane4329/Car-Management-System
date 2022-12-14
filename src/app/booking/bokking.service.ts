import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class BokkingService {
  value: any;
  editDataValidation = new ReplaySubject<boolean>();
  address = new ReplaySubject<any>();
  username = new ReplaySubject<any>();

  constructor(private dataService: DataService) { }

  getBookings() {
    return this.dataService.getBookingDetails();
  }

  postBookings(data: any, activeUSer: any) {
    return this.dataService.postBookingDetails(data, activeUSer);
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
