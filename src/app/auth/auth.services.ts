import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthService {

    isAuth = new Subject<boolean>();
    isLogout = new Subject<boolean>();
}