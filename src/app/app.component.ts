import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'car-management-system';
  isAuthenticate = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isAuth.subscribe(res => {
      this.isAuthenticate = res;
    })
    this.authService.isLogout.subscribe(res => {
      this.isAuthenticate = res;
    })
  }
}
