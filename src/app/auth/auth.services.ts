import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { DataService } from "../shared/data.service";

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private dataService: DataService) { }

    isAuth = new Subject<boolean>();
    isLogout = new Subject<boolean>();



    loggedIn = false;

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

    logIn() {
        this.loggedIn = true;
        localStorage.setItem('user','true');
    }

    logout() {
        this.loggedIn = false;
        localStorage.setItem('user','false');
    }

    getUser() {
        return this.dataService.userDetails()
    }


}