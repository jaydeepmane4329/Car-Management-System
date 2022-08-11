import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Bookings } from "./booking.mode";

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(private http: HttpClient) { }


    getBookingDetails() {
        return this.http.get<Map<string, Bookings>>('/assets/bookings.json')
            .pipe(map(data => Object.keys(data).map(key => data[key])))
    }

    postBookingDetails(data: any) {

    }

    userDetails() {
        return this.http.get<Map<string, any>>('/assets/users.json')
            .pipe(map(data => Object.keys(data).map(key => data[key])))
    }

    carDetails() {
        return this.http.get<Map<string, any>>('/assets/carDetails.json')
            .pipe(map(data => Object.keys(data).map(key => data[key])))
    }

    adminDetails() {
        return this.http.get<Map<string, any>>('/assets/admin.json')
            .pipe(map(data => Object.keys(data).map(key => data[key])))
    }
} 