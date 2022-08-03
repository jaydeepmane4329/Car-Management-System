import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'car-management-system';
  isAuthenticate = false;

  constructor(private authService: AuthService) { }
 
  // this event is coming from auth component. using subject from auth service(isAuth)
  ngOnInit() {
    this.authService.isAuth.subscribe(res => {
      this.isAuthenticate = res;
    })

//  This event is coming from header component. using Subject from Auth Service(isLogout)
    this.authService.isLogout.subscribe(res => {
      this.isAuthenticate = res;
    })
  }

}
