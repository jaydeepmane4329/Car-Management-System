import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Bookings } from '../shared/booking.mode';
import { DataService } from '../shared/data.service';

@Injectable({
  providedIn: 'root'
})
export class BokkingService {
  value: any;

  editData  = new Subject<any>();

  constructor(private dataService: DataService) { }


  getBookings() {
    return this.dataService.getBookingDetails();
  }

  postBookings(data: any) {
    return this.dataService.postBookingDetails(data);
  }

  deleteBooking(id:any){
    return this.dataService.deleteBooking(id)
  }

  allowBooking(id: any) {
    return this.dataService.allowUserBooking(id);
  }

  rejectBooking(id: any) {
    return this.dataService.rejectUserBooking(id);
  }
}
