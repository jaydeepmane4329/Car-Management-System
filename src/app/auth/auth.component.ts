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

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit(): void {

    }

    onSubmit(form: NgForm) {
        console.log(form.value.email);
    }

    logIn() {
        this.authService.getUser().subscribe({
            next: (res => {
                res.forEach(item => {
                    if (item.email === this.form.value.email && item.password === this.form.value.password) {
                        this.authService.isAuth.next(true);
                        this.authService.logIn()
                        this.router.navigate(['/home'])
                    } else {
                        if(this.userExist){
                            this.userExist = false;
                        }else{
                            this.userExist = true;
                        }
                    }
                })
            }), error: (error) => {
                console.log(error);
            }
        })
    }
}