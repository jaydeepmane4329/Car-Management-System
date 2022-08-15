import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataService } from "../shared/data.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private dataService: DataService) { }

    isAuth = new Subject<boolean>();
    isLogout = new Subject<boolean>();
    isAdmin = new Subject<boolean>();




    loggedIn = (localStorage.getItem('user') === 'true');
    adminLoggedIn = (localStorage.getItem('admin') === 'true');

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

    logIn() {
        localStorage.setItem('user', 'true');
    }

    logout() {
        localStorage.clear()
    }

    getUser() {
        return this.dataService.userDetails()
    }

    getAdmin() {
        return this.dataService.adminDetails()
    }


}