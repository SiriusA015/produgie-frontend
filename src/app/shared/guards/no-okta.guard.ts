import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class NoOktaGuard implements CanActivate {
  
  isAuthenticated: boolean;

  constructor(public oktaAuth: OktaAuthService, 
              private router: Router) {
  }
  
  async canActivate() {

    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    
    if (this.isAuthenticated) {
      this.router.navigate(['/okta/callback']);
    }
    
    return !this.isAuthenticated;

  }
  
}
