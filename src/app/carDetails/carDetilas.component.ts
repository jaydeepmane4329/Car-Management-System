import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.services";
import { DataService } from "../shared/data.service";

@Component({
    selector: 'app-carDetails',
    templateUrl: './carDetails.component.html',
    styleUrls: ['./carDetails.component.css']
})

export class carDetailsComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router, private dataService: DataService) { }

    carDetails = [];

    ngOnInit(): void {
        if ((localStorage.getItem('user') === 'true') || (localStorage.getItem('admin') === 'true')) {
            this.authService.isAuth.next(true);
        }

        this.getAllCardetails();
    }

    getAllCardetails() {
        this.dataService.carDetails().subscribe({
            next: (res) => {
                this.carDetails = res;
            }
        })
    }


}