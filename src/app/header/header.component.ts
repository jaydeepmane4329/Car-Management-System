import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.services";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) { }

  isLogout = true;
  Admin = localStorage.getItem('admin') === 'true';

  ngOnInit() {
    this.authService.isAdmin.subscribe(res => {
      this.Admin = res;
      console.log(res);
    })
  }

  onLogout() {
    this.authService.isLogout.next(false)
    this.router.navigate(['/']);
    this.authService.logout()
  }
}