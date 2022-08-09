import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Bookings } from "./booking.mode";

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(private http: HttpClient) { }

    bookingsArr = [];

    getBookingDetails() {
        return this.http.get<Map<string, Bookings>>('/assets/bookings.json')
            .pipe(map(data => Object.keys(data).map(key => data[key])))
    }

    postBookingDetails(data: any) {
        return this.http.post<Map<string, Bookings>>('/assets/bookings.json', data)
    }
} 