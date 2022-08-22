import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { BokkingService } from "../booking/bokking.service";
import { AuthService } from "./auth.services";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    @ViewChild('authForm') form: NgForm | any;
    isAuthenticated = false;
    userExist = false;
    flag = false;
    userLoggedIn = false;

    constructor(private router: Router, private authService: AuthService, private bookingService: BokkingService) { }

    ngOnInit(): void {
    }

    onSubmit(form: NgForm) {
        console.log(form.value.email);
    }


    logIn() {
        // this.getUser()
        this.authService.getUser().subscribe({
            next: (res => {
                res.forEach(item => {

                    if (item.email === this.form.value.email && item.password === this.form.value.password) {
                        this.flag = true;
                        if (item.type === 'admin') {
                            localStorage.setItem('activeUSer', item.email)
                            this.authService.isAdmin.next(true);
                            this.authService.isAuth.next(true)
                            localStorage.setItem('admin', 'true')
                            localStorage.setItem('login', 'true')
                            this.router.navigate(['/home'])
                        } else {
                            localStorage.setItem('activeUSer', item.email)
                            this.authService.isAuth.next(true);
                            localStorage.setItem('user', 'true');
                            this.authService.loggedIn = true;
                            this.router.navigate(['/home'])
                            localStorage.setItem('login', 'true')
                        }
                    }
                });
                if (!this.flag) {
                    alert("INVALID CRedentials")
                }
            }), error: (error) => {
                alert("Error while geting user details")
            }
        })

    }


}


