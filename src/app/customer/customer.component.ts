import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "../dialog/dialog.component";
import { CustomerService } from "./customer.service";
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from "../auth/auth.services";
import { Router } from "@angular/router";
@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.css']
})
export class Customers implements OnInit {

    displayedColumns: string[] = ['id', 'licenceImage', 'username', 'firstname', 'lastname', 'emailId', 'licencenumber', 'licenceExpiryDate', 'address', 'addhar', 'mobile', 'createdDate', 'modifiedDate', 'action'];
    dataSource!: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private dialog: MatDialog, private customerService: CustomerService, private authService: AuthService, private router: Router) { }

    ngOnInit(): void {
        this.getAllCustomers();
        if ((localStorage.getItem('user') === 'true') || (localStorage.getItem('admin') === 'true')) {
            this.authService.isAuth.next(true);
        }
    }

    openDialog() {
        this.dialog.open(DialogComponent, {
            width: '60%'
        }).afterClosed().subscribe(val => {
            if (val === 'save') {
                this.getAllCustomers()
            }
        })
    }

    getAllCustomers() {
        this.customerService.getCustomer().subscribe({
            next: (res) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort
                console.log(res);
            },
            error: (error) => {
                alert('Error while fetching the records!')
            }
        })
    }

    editCustomer(row: any) {
        this.dialog.open(DialogComponent, {
            width: '60%',
            data: row
        }).afterClosed().subscribe(val => {
            if (val === 'update') {
                this.getAllCustomers()
            }
        })
    }

    delete(id: number) {
        if (confirm('are you sure!')) {
            this.customerService.deleteCustomer(id).subscribe({
                next: (res) => {
                    alert('customer Deleted Succesfully')
                    this.getAllCustomers()
                },
                error: () => {
                    alert("error while deleteing record")
                }
            })
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}



