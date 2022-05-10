import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { CronofyAlertComponent } from '../cronofy-alert/cronofy-alert.component';
import { WarningAlertComponent } from '../warning-alert/warning-alert.component';

declare const window: any;

@Component({
  selector: 'app-sso-callback-azure',
  templateUrl: './sso-callback-azure.component.html',
  styleUrls: ['./sso-callback-azure.component.scss']
})
export class SsoCallbackAzureComponent implements OnInit {

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
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      queries => {
        console.log(queries);
        if (queries.error) {
          this.error = queries.error;
          this.errorDescription = queries.error_description;
        } else {
          this.login(queries);
        }
      }
    );
  }

  login(queries: any) {

    if (queries.code && queries.state) {
      this.http.get(`${environment.baseurl}/user/sso/azure?code=${queries.code}&state=${queries.state}`)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (window.deferredPrompt !== null && window.deferredPrompt !== undefined) {
              window.deferredPrompt.prompt();
            }
            localStorage.setItem('authToken', res.data.accessToken);

            this.getMyProfile();
          },
          (err: any) => {
            console.log(err);
            this.router.navigate(['/auth']);
          }
        );
    }

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
          localStorage.setItem('email', res.email);
          localStorage.setItem(
            'picture',
            res.avatar ? res.avatar : 'avatar_10'
          );

          this.isHandset$.subscribe(
            (data) => {
              if (data) {
                this.checkCronofyAuthorization("handset");
                // this.router.navigate(['/sprint']);
              } else {
                this.checkCronofyAuthorization("web");
                // this.router.navigate(['/dashboard/my-dashboard']);
              }
            }
          );
        },
        (err) => console.log(err)
      );
  }

  checkCronofyAuthorization(deviceType) {
    let navigatTo;

    if(deviceType === 'handset') {
      navigatTo = '/sprint';
    }
    else {
      navigatTo = '/dashboard/my-dashboard';
    }

    const authToken = localStorage.getItem('authToken');
        const headers = {
            headers : {
              Authorization : `Bearer ${authToken}`
            }
        }
        this.http.get(environment.baseurl+`/cronofy/check-user-all`, headers).subscribe((result:any)=>{
          if(result.status ===  400 || result.status === 401){
            this.showWarning("Something went wrong with cronofy authorization");
          }
          else if(result.isAdmin && result.isRegistered){
            this.router.navigate([navigatTo]);
          }
          else if(result.isAdmin && !result.isRegistered && result.link != null) {
            this.showCronofyModal(result.link);
          }
          else if(!result.isAdmin && !result.isRegistered && result.link == null) {
            this.router.navigate([navigatTo]);
          }
          else if(!result.isAdmin && !result.isRegistered && result.link != null) {
            this.showCronofyModal(result.link);
          }
          else if(!result.isAdmin && result.isRegistered && result.link == null) {
            this.router.navigate([navigatTo]);
          }
        })
  }

  showCronofyModal(url) {
    const dialogRef = this.dialog.open(CronofyAlertComponent, {
      width: "635px",
      height: "289px",
      panelClass: '',
      data: { redirectUrl: url },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( result => {
        if(!result.isReadyToAuthenticate) {
          this.router.navigate(['/dashboard/my-dashboard']);
        }
    });
  }

  showWarning(message){
    const dialogRef = this.dialog.open(WarningAlertComponent, {
      width: "635px",
      height: "289px",
      panelClass: '',
      data: { message: message },
      disableClose: true
    });
    dialogRef.afterClosed().subscribe( result => {
      this.router.navigate(['/dashboard/my-dashboard']);
    });
  }
}
