import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.services';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAdminAuthenticated()
            .then(
                (authenticated: boolean) => {
                    if (authenticated) {
                        return true;
                    } else {
                        if (localStorage.getItem('user') === 'true') {
                            this.router.navigate(['home'])
                        }
                        if (!(localStorage.getItem('user') === 'true')) {
                            this.router.navigate([''])
                        }

                        if ((localStorage.getItem('admin') === 'true')) {
                            this.router.navigate(['admin'])
                        }

                        if (!(localStorage.getItem('admin') === 'true')) {
                            this.router.navigate([''])
                        }
                    }

                });
    }
}
