import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot  } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class OktaAuthGuard implements CanActivate, CanActivateChild {
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, 
              private router: Router,
              private authService: AuthService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.isAuthenticated = await this.authService.isAuthenticated();
  
    if (this.isAuthenticated) {
      return this.isAuthenticated;
    }
    this.router.navigate(['/auth/login'], { queryParams: { redirectUrl: state.url }});
    // return false;
  }

  async canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {    
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
      if (this.isAuthenticated) {
        return this.isAuthenticated;
      }
      this.router.navigate(['/auth/login'], { queryParams: { redirectUrl: state.url }});
      // return false;
  }
}
