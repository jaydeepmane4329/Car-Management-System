import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth/auth.services";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

    constructor(private authService: AuthService) { }

    ngOnInit(): void {

        if (localStorage.getItem('user') === 'true') {
            this.authService.isAuth.next(true);
        }
    }
}