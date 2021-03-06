import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/pages/login/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const currentToken = localStorage.getItem('token');

    if (currentToken) {
      if (!this.authService.tokenExpired(currentToken)) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }
}
