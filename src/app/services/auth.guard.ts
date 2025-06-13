import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ClaimTypes } from '../shared/consts';

interface JwtPayload {
  role: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const token = localStorage.getItem('jwt_token');

    if (!token) {
      return of(this.router.createUrlTree(['login']));
    }

    try {
      const decoded = jwtDecode<any>(token);
      const userRole = decoded[ClaimTypes.role];

      const allowedRoles = route.data['roles'] as string[] | undefined;

      if (allowedRoles && !allowedRoles.includes(userRole)) {
        return of(this.router.createUrlTree(['login']));
      }

      return of(true);
    } catch (error) {
      return of(this.router.createUrlTree(['login']));
    }
  }
}
