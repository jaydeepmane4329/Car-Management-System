import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { DataService } from "../shared/data.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private dataService: DataService, private router: Router) { }

    isAuth = new Subject<boolean>();
    isLogout = new Subject<boolean>();
    isAdmin = new Subject<boolean>();
    loggedIn = (localStorage.getItem('user') === 'true');
    adminLoggedIn = (localStorage.getItem('admin') === 'true');
    loginIN = !(localStorage.getItem('login') === 'true');

    isAuthneticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loggedIn)
                }, 100)
            }
        );
        return promise;
    }

    isAdminAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.adminLoggedIn)
                }, 100)
            }
        )
        return promise;
    }

    isLoginAuthneticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.loginIN)
                }, 100)
            }
        )
        return promise;
    }

    logout() {
        localStorage.clear()
        this.router.navigate([''])
    }

    getUser() {
        return this.dataService.userDetails()
    }
}