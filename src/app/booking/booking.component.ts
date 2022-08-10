import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router, Routes } from "@angular/router";
import { Bookings } from "../shared/booking.mode";
import { ValidationDilog } from "../validationDilog/validtionDilog.component";
import { BokkingService } from "./bokking.service";
@Component({
    selector: 'app-booking',
    templateUrl: './booking.component.html',
    styleUrls: ['booking.component.css']
})

export class Booking implements OnInit {


    displayedColumns: string[] = ['id', 'username', 'bookingId', 'bookingStatus', 'firstname', 'lastname', 'noofPassangers', 'mobile', 'carDetails', 'modifiedname', 'createdDate', 'modifiedDate', 'createdname', 'action'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    booking = true;

    constructor(private router: Router, private route: ActivatedRoute, private bookingService: BokkingService, private dilog: MatDialog) { }
    ngOnInit() {
        this.getAllBookings()
    }

    getAllBookings() {
            this.bookingService.getBookings().subscribe({
                next:(res) =>{
                    this.dataSource = new MatTableDataSource(res);
                    this.dataSource.paginator = this.paginator;
                    this.dataSource.sort = this.sort
                },error : (error) =>{
                    alert('error while fetching the records')
                }
            })
          
    }

    editCustomer(row: any) {

    }

    delete(id: number) {

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