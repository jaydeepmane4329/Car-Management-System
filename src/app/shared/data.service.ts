import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, observable } from "rxjs";
import { map } from 'rxjs/operators';
import { Bookings } from "./booking.mode";

@Injectable({ providedIn: 'root' })
export class DataService {
    constructor(private http: HttpClient) { }

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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
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
                "createdDate": "2022-08-03T18:11:25.939Z",
                "modifiedDate": "2022-08-03T18:11:25.939Z",
                "createdname": "jhon"
            }
        ];


    getBookingDetails() {
        return Observable.create(observer => {
            setTimeout(() => {
                observer.next(this.bookings)
            }, 1000)
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

    deleteBooking(id: any) {
        console.log(this.bookings);
        console.log(id);
        this.bookings.splice(id, 1)

    }

    allowUserBooking(id: any) {
        this.bookings[id].bookingStatus = 'Confirmed'
    }

    rejectUserBooking(id: any) {
        this.bookings[id].bookingStatus = 'Rejected'
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


