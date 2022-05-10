import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CronofyAlertComponent } from '../cronofy-alert/cronofy-alert.component';
import { WarningAlertComponent } from '../warning-alert/warning-alert.component';
import jwt_decode from "jwt-decode";
import { AuthService } from 'src/app/shared/service/auth.service';
import moment from 'moment';

declare const window: any;

@Component({
  selector: 'app-sso-callback-okta',
  templateUrl: './sso-callback-okta.component.html',
  styleUrls: ['./sso-callback-okta.component.scss'],
})
export class SsoCallbackOktaComponent implements OnInit {
  error: string;
  errorDescription: string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe((queries) => {

      if (queries.error) {
        this.error = queries.error;
        this.errorDescription = queries.error_description;
      } else {
        this.exchangeCodeForToken(queries);
      }
    });
  }

  exchangeCodeForToken(queries: any) {

    let data = {
      code: queries.code,
      code_verifier: localStorage.getItem('code_verifier'),
    }

     this.http.post(`${environment.baseurl}/okta/callback`, data).subscribe((res:any)=>{

      const tokenExpiryTime:any = moment().add(1, 'hours');
      localStorage.setItem('tokenExpiryTime', tokenExpiryTime);

      localStorage.setItem('logintype', 'sso');

      localStorage.setItem('authToken', res.data.access_token);
      localStorage.setItem('idToken', res.data.id_token);
      localStorage.removeItem('code_verifier');

      this.getMyProfile();
      this.userDetails();
    },err=>{
      console.log("error block", err);
      this.error = err?.error?.data?.error;
      this.errorDescription = err?.error?.data?.error_description;
    });
  }

  getMyProfile() {
    const authToken = localStorage.getItem('authToken');
    this.http
      .get(`${environment.baseurl}/user/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .subscribe(
        (res: any) => {
          const username = res.fullName;
          localStorage.setItem('userName', username);
          localStorage.setItem('preferedName',res.salutation)
          localStorage.setItem('email', res.email);
          localStorage.setItem('user-type', "authenticated");

          localStorage.setItem(
            'picture',
            res.avatar ? res.avatar : 'avatar_10'
          );
          localStorage.setItem('imageurl', res.imageUrl);

          this.isHandset$.subscribe((data) => {
            if (data) {
              this.checkCronofyAuthorization('handset');
            } else {
              this.checkCronofyAuthorization('web');
            }
          });
        },
        (err) => console.log(err)
      );
  }

  checkCronofyAuthorization(deviceType) {
    let navigatTo;

    if (deviceType === 'handset') {
      navigatTo = '/sprint';
    } else {
      localStorage.setItem('activeModule', 'LEAD')
      navigatTo = '/dashboard/my-dashboard';
    }

    const authToken = localStorage.getItem('authToken');
    const headers = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    this.http
      .get(environment.baseurl + `/cronofy/check-user-all`, headers)
      .subscribe((result: any) => {
        if (result.status === 400 || result.status === 401) {
          this.showWarning('Something went wrong with cronofy authorization');
        } else if (result.isAdmin && result.isRegistered) {
          this.router.navigate([navigatTo]);
        } else if (
          result.isAdmin &&
          !result.isRegistered &&
          result.link != null
        ) {
          this.showCronofyModal(result.link);
        } else if (
          !result.isAdmin &&
          !result.isRegistered &&
          result.link == null
        ) {
          this.router.navigate([navigatTo]);
        } else if (
          !result.isAdmin &&
          !result.isRegistered &&
          result.link != null
        ) {
          this.showCronofyModal(result.link);
        } else if (
          !result.isAdmin &&
          result.isRegistered &&
          result.link == null
        ) {
          this.router.navigate([navigatTo]);
        }
      });
  }

  showCronofyModal(url) {
    const dialogRef = this.dialog.open(CronofyAlertComponent, {
      width: '635px',
      height: '289px',
      panelClass: '',
      data: { redirectUrl: url },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result.isReadyToAuthenticate) {
        this.isHandset$.subscribe((data) => {
          if (data) {
            const activeModule = localStorage.getItem('activeModule')
            if(activeModule == 'TEAM') {
              this.router.navigate(['/teams/sprint/dashboard']);
            } else {
              this.router.navigate(['/sprint']);
            }
          } else {
            localStorage.setItem('activeModule', 'LEAD')
            this.router.navigate(['/dashboard/my-dashboard']);
          }
        });
      }
    });
  }

  showWarning(message) {
    const dialogRef = this.dialog.open(WarningAlertComponent, {
      width: '635px',
      height: '289px',
      panelClass: '',
      data: { message: message },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      localStorage.setItem('activeModule', 'LEAD')
      this.router.navigate(['/dashboard/my-dashboard']);
    });
  }

  async userDetails() {

    const authToken = localStorage.getItem('oktaToken');
    const headers = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${authToken}`)
    }

    this.http.get(environment.teamBaseUrl+`/users/getUserDetails`, headers)
        .subscribe(
          (res: any) => {
            localStorage.setItem('client_id',res.client_id);
            localStorage.setItem('user_id',res.id);
            localStorage.setItem('exclude_for_analytics', res.excludeForAnalytics);
          },
          (err: any) => {
            console.log(err);
          }
        );
  }

  async retry() {
    await this.authService.signOut();
  }
}
