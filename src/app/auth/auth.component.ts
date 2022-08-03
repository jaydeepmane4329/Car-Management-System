import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "./auth.services";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

    @ViewChild('authForm') form: NgForm | any;
    isAuthenticated = false;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {

    }

    onSubmit(form: NgForm) {

        this.isAuthenticated = true;
        if (this.isAuthenticated) {
            this.router.navigate(['./home']);
        }

        this.authService.isAuth.next(true);
    }
}