import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.services";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private router:Router,private authService :AuthService){}
    isLogout = true;
    onLogout(){
      this.authService.isLogout.next(false)
      this.router.navigate(['/']);
    }
}