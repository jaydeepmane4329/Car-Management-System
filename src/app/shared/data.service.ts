import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, observable, ReplaySubject, Subject } from "rxjs";
import { map } from 'rxjs/operators';
import { Bookings } from "./booking.mode";

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(private http: HttpClient) { }

    editData = new ReplaySubject<any>();

    bookings =
        [
            {
                "id": "0",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "firstname": "jhon",
                "lastname": "cena",
                "child": 5,
                "adults": 15,
                "mobile": 9064253465,
                "CarDetails": "Honda City",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "1",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "firstname": "jhon",
                "child": 5,
                "adults": 15,
                "lastname": "cena",
                "noofPassangers": 5,
                "mobile": 9064253465,
                "CarDetails": "swift",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "2",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "child": 5,
                "adults": 15,
                "firstname": "jhon",
                "lastname": "cena",
                "noofPassangers": 5,
                "mobile": 9064253465,
                "CarDetails": "i20",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "3",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "firstname": "jhon",
                "child": 5,
                "adults": 15,
                "lastname": "cena",
                "noofPassangers": 5,
                "mobile": 9064253465,
                "CarDetails": "i10",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "4",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "firstname": "jhon",
                "lastname": "cena",
                "noofPassangers": 5,
                "child": 5,
                "adults": 15,
                "mobile": 9064253465,
                "CarDetails": "wagnor",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "5",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "firstname": "jhon",
                "lastname": "cena",
                "noofPassangers": 5,
                "mobile": 9064253465,
                "child": 5,
                "adults": 15,
                "CarDetails": "Honda City",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "6",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "firstname": "jhon",
                "lastname": "cena",
                "noofPassangers": 5,
                "mobile": 9064253465,
                "child": 5,
                "adults": 15,
                "CarDetails": "Honda City",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "7",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "firstname": "jhon",
                "lastname": "cena",
                "child": 5,
                "adults": 15,
                "noofPassangers": 5,
                "mobile": 9064253465,
                "CarDetails": "Honda City",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "8",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "firstname": "jhon",
                "lastname": "cena",
                "noofPassangers": 5,
                "mobile": 9064253465,
                "child": 5,
                "adults": 15,
                "CarDetails": "Honda City",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            },
            {
                "id": "9",
                "username": "jack@123",
                "bookingId": 4353454,
                "bookingStatus": "pending",
                "child": 5,
                "adults": 15,
                "firstname": "jhon",
                "lastname": "cena",
                "noofPassangers": 5,
                "mobile": 9064253465,
                "CarDetails": "Honda City",
                "modifiedname": "jhon",
                "createdDate": new Date(),
                "modifiedDate": new Date(),
                "createdname": "jhon"
            }
        ];

    getBookingDetails() {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(this.bookings)
            })
        })
    }

    postBookingDetails(data: any) {
        let bookingid = Math.floor(Math.random() * 100) + 1;
        data['bookingId'] = bookingid
        data['id'] = this.bookings.length
        data['bookingStatus'] = 'pending';
        data['createdDate'] = new Date();
        console.log(data);
        this.bookings.push(data);
    }

    editBookingDetails(id: any, data: any, activeuser: string) {
        console.log(id);
        this.bookings[id].username = data.username
        this.bookings[id].firstname = data.firstname
        this.bookings[id].lastname = data.lastname
        this.bookings[id].adults = data.adults
        this.bookings[id].child = data.child
        this.bookings[id].modifiedDate = new Date()
        this.bookings[id].modifiedname = activeuser
    }

    editBooking(id: any) {
        return this.bookings[id];
    }

    deleteBooking(id: any) {
        let count = 0;
        console.log(this.bookings);
        console.log(id);
        this.bookings.splice(id, 1)
        this.bookings.forEach((item) => {
            item.id = count.toString();
            count++;
        })
    }

    allowUserBooking(id: any) {
        this.bookings[id].bookingStatus = 'Confirmed'
    }

    rejectUserBooking(id: any) {
        this.bookings[id].bookingStatus = 'Rejected'
    }

    userDetails() {
        return this.http.get<Map<string, any>>('/assets/credentials.json')
            .pipe(map(data => Object.keys(data).map(key => data[key])))
    }

    carDetails() {
        return this.http.get<Map<string, any>>('/assets/carDetails.json')
            .pipe(map(data => Object.keys(data).map(key => data[key])))
    }

}


