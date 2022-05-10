import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/service/auth.service';

declare const window: any;

@Component({
  selector: 'app-sso-callback',
  templateUrl: './sso-callback.component.html',
  styleUrls: ['./sso-callback.component.scss']
})
export class SsoCallbackComponent implements OnInit {
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
    private authSerive: AuthService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      queries => {
        console.log(queries);
        this.login(queries);
      }
    );
  }

  login(queries: any) {

    if (queries.code && queries.state) {
      this.http.get(`${environment.baseurl}/sso/callback?code=${queries.code}&state=${queries.state}`)
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
    const authToken = this.authSerive.getAccessToken();
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
                this.router.navigate(['/sprint']);
              } else {
                localStorage.setItem('activeModule', 'LEAD')
                this.router.navigate(['/dashboard/my-dashboard']);
              }
            }
          );
        },
        (err) => console.log(err)
      );
  }

}
