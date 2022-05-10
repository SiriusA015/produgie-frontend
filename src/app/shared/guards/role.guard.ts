import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}
  
  async canActivate(
    next: ActivatedRouteSnapshot) {
      // const status = JSON.parse(localStorage.getItem('gla_survey_completed'));
      // const isTeamCreated = localStorage.getItem('isTeamCreated');
      
      /* get allowed roles */
      const accessToken = await this.authService.getAccessToken();

      const decoded:any = jwt_decode(accessToken);
        
      const roles = JSON.stringify(decoded.Groups);

      const allowedRoles = next.data['roles']; /* allowed roles for perticular page */
            
      let isAllowed = false;

      if (allowedRoles) {
        allowedRoles.forEach(role => {

          if (roles && roles.includes(role)) {

            isAllowed = true;
          };
        });
      }
      else {

        return true; /*  this is for temporary, once all pages have roles then will remove this else part */
      }

      if(isAllowed) {
        return isAllowed;
      } else {
        this.router.navigate(['/teams/dashboard']);
      }
    }
  }

