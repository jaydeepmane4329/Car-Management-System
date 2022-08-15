import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router, Routes } from "@angular/router";
import { AuthService } from "../auth/auth.services";
import { BookingDetailsComponent } from "../booking-details/booking-details.component";
import { Bookings } from "../shared/booking.mode";
import { ValidationDilog } from "../validationDilog/validtionDilog.component";
import { BokkingService } from "./bokking.service";
@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['booking.component.css']
})

export class Booking implements OnInit {


    displayedColumns: string[] = ['id', 'username', 'bookingId', 'bookingStatus', 'firstname', 'lastname', 'noofPassangers', 'CarDetails', 'modifiedname', 'createdDate', 'modifiedDate', 'createdname', 'action'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    booking = true;

    constructor(private router: Router, private route: ActivatedRoute, private bookingService: BokkingService, private dilog: MatDialog, private authService: AuthService) { }
    ngOnInit() {
        this.getAllBookings()

        if (localStorage.getItem('user') === 'true') {
            this.authService.isAuth.next(true);
            this.router.navigate(['booking'])
        }
    }

    getAllBookings() {
        this.bookingService.getBookings().subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort
            }, error: (error) => {
                alert('error while fetching the records')
            }
        })

    }

    editBooking(data:any ) {
         this.bookingService.editData.next(data);
         this.router.navigate(['bookingDetails'])
    }

    deleteBooking(id: any) {
       this.bookingService.deleteBooking(id)
       this.getAllBookings()
    }

    openDialog() {
        this.dilog.open(ValidationDilog, {
            width: '30%'
        })
    }



    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}