import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router, Routes } from "@angular/router";
import { AuthService } from "../auth/auth.services";
import { DataService } from "../shared/data.service";
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

    constructor(private router: Router, private route: ActivatedRoute, private bookingService: BokkingService, private dilog: MatDialog, private authService: AuthService, private dataService: DataService) { }
    ngOnInit() {
        this.getAllBookings()

        if ((localStorage.getItem('user') === 'true') || (localStorage.getItem('admin') === 'true')) {
            this.authService.isAuth.next(true);
        }
    }

    getAllBookings() {
        this.bookingService.getBookings().subscribe({
            next: (res) => {
                console.log(res)
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort
            }, error: (error) => {
                alert('error while fetching the records')
            }
        })

    }

    editBooking(id: any) {
        const data = this.bookingService.editBookings(id);
        this.dataService.editData.next(data);
        this.router.navigate(['bookingDetails'])
        this.bookingService.editDataValidation.next(true);
        this.bookingService.address.subscribe(res => {
            localStorage.setItem('address', res)
        })
        this.bookingService.username.subscribe(res => {
            localStorage.setItem('username', res);
        })
    }

    deleteBooking(id: any) {
        if (confirm("are you sure!")) {
            this.bookingService.deleteBooking(id)
            this.getAllBookings()
            alert("Booking Delted Successfully")
        }
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