import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

declare const window: any;

@Component({
  selector: 'app-sso-callback-google',
  templateUrl: './sso-callback-google.component.html',
  styleUrls: ['./sso-callback-google.component.scss']
})
export class SsoCallbackGoogleComponent implements OnInit {
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      queries => {
        if (queries.error) {
          this.error = queries.error;
          this.errorDescription = queries.error_description ? queries.error_description : 'The user has denied access to the scope requested by the client application.';
        } else {
          this.login(queries);
        }
      }
    );
  }

  login(queries: any) {

    if (queries.code) {
      this.http.get(`${environment.baseurl}/user/sso/google?code=${queries.code}`)
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
                this.router.navigate(['/sprint']);
              } else {
                this.router.navigate(['/dashboard/my-dashboard']);
              }
            }
          );
        },
        (err) => console.log(err)
      );
  }

}
