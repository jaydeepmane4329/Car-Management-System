import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.services";
import { BokkingService } from "../booking/bokking.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private bookingService: BokkingService) { }

  displayedColumns: string[] = ['id', 'username', 'bookingId', 'bookingStatus', 'noofPassangers', 'CarDetails', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    if (localStorage.getItem('admin') === 'true') {
      this.authService.isAuth.next(true);
    }

    this.getAllBookings()
  }

  allowBooking(id: any) {
    this.bookingService.allowBooking(id)
  }

  rejectBooking(id: any) {
    this.bookingService.rejectBooking(id)
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
