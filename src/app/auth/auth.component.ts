import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
    userLoggedIn = false;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {

    }

    onSubmit(form: NgForm) {
        console.log(form.value.email);
    }




    // User login
    getUser() {
        this.authService.getUser().subscribe({
            next: (res => {
                res.forEach(item => {
                    if (item.email === this.form.value.email && item.password === this.form.value.password) {
                        this.authService.isAuth.next(true);
                        this.authService.logIn()
                        this.authService.loggedIn = true;
                        this.router.navigate(['/home'])
                    } else {
                        if (this.userExist) {
                            this.userExist = false;
                            this.userLoggedIn = true;
                        } else {
                            this.userExist = true;
                            this.userLoggedIn = false;
                        }
                    }
                })
            }), error: (error) => {
                alert("Error while geting user details")
            }
        })
    }


    // Admin LogIn
    getAdmin() {
        this.authService.getAdmin().subscribe({
            next: (res) => {
                console.log(res.forEach(item => {
                    if (item.email === this.form.value.email && item.password === this.form.value.password) {
                        this.authService.isAdmin.next(true);
                        this.authService.logIn()
                        this.authService.isAuth.next(true)
                        localStorage.setItem('admin', 'true')
                        this.router.navigate(['/admin'])
                    }
                }))
            }, error: (error) => {
                alert("Error while getting Admin details")
            }
        })
    }

    logIn() {
        this.getAdmin()
        this.getUser()
    }
}





