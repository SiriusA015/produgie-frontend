import { HttpClient } from '@angular/common/http';
import { DataService } from './../../../design/service/data.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { CronofyAlertComponent } from '../cronofy-alert/cronofy-alert.component';
import { WarningAlertComponent } from '../warning-alert/warning-alert.component';
import { OktaAuthService } from '@okta/okta-angular';
import { Tokens } from '@okta/okta-auth-js';

//@ts-ignore
import * as OktaSignIn from '@okta/okta-signin-widget';
declare const window: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  authService;
  widget;
  redirect:string;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  sub: Subscription;
  ssoProvider: string;
  ssoLink: string;

  userData = {
    userid: 123,
    isSSO: true,
    provider: 'Google',
  };
  isSSOLogin = false;
  isLoading = false;
  message: any;
  isLogin = false;
  show: boolean;
  loadCounter = 0;
  password = new FormControl('', [
    Validators.required,
   ]);
  confirmpassword = new FormControl('', [
    Validators.required,
    CustomValidators.equalTo(this.password),
  ]);
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, CustomValidators.email]),
    password: this.password,
  });

  returnUrl : string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    public oktaAuth: OktaAuthService,
  ) {
    this.show = false;
    if(this.route.snapshot.queryParams['redirectUrl']){
      localStorage.setItem('autoRedirectUrl', this.route.snapshot.queryParams['redirectUrl'])
    }else{
      if(localStorage.getItem('autoRedirectUrl')){
        localStorage.removeItem('autoRedirectUrl');
      }
    }

    this.route.queryParams.subscribe((queries) => {
      if (queries.fromLogin) {
        this.isLoading = true;
      } else {
        this.isLoading = false;
      }
    });

    this.authService = oktaAuth;

    this.widget = new OktaSignIn({
      el: '#okta-signin-container',
      baseUrl: environment.oktaBaseUrl,
      authParams: {
        pkce: environment.oktaPkce
      },
      clientId: environment.oktaClientId,
      redirectUri: environment.oktaRedirectUrl,
      features: {
        idpDiscovery: true
      },
      idpDiscovery: {
        requestContext: window.location.href
      },
      language: 'en',
      i18n: {
        en: {
          'primaryauth.username.placeholder': 'Email Address',
          'errors.E0000004' : 'Your email or password is incorrect. Please try again.'
        }
      },
    });

    // after successful authentication with IdP
    // const _this = this;
    this.widget.authClient.session.exists().then(sessionExists=> {
      if (sessionExists) {
        this.widget.authClient.token.getWithoutPrompt().then(response=> {
          this.widget.authClient.tokenManager.setTokens(response.tokens);
          this.router.navigate(['/auth/okta/callback']);
        });
      }
      console.log("sessionExists", sessionExists);
    });
  }

  async ngOnInit() {

    this.route.queryParams.subscribe(
      queryParams => {
        this.redirect = queryParams.redirect;
        const redirect = localStorage.getItem("redirect");
        if(!redirect && queryParams.redirect) {
          localStorage.setItem("redirect", this.redirect);
          localStorage.setItem("selectedTeamId", atob(queryParams.id));
          localStorage.setItem("activeModule", "TEAM");
        }
      }
    );

    const originalUri = this.authService.getOriginalUri();
    if (!originalUri) {
      this.authService.setOriginalUri('/');
    }

    const tokens: Tokens = await this.widget.showSignInToGetTokens({
      el: '#okta-signin-container',
    });

    await this.authService.handleLoginRedirect(tokens);

    this.widget.hide();

    this.router.navigate(['/auth/okta/callback']);

    /* const authToken = this.authService.getAccessToken();
    if (authToken === null) {
      this.dataService.sharedMessage.subscribe(
        (message) => (this.message = message)
      );
      this.isLogin = this.message.signUp;
    } else {
      this.isHandset$.subscribe((data) => {
        if (data) {
          this.router.navigate(['/sprint']);
        } else {
          this.router.navigate(['/dashboard/my-dashboard']);
        }
      });
    }

    this.loginForm.get('email').valueChanges.subscribe((email) => {
      if (this.loginForm.get('email').valid) {
        if (this.sub) {
          this.sub.unsubscribe();
        }
        this.sub = this.http
          .post(`${environment.baseurl}/user/check-idp`, { email })
          .subscribe(
            (res: any) => {
              this.isSSOLogin = res.data.idp;
              if (this.isSSOLogin) {
                this.ssoProvider = res.data.provider;
                this.ssoLink = res.data.ssoLink;
                if(this.ssoProvider != 'okta') {
                  localStorage.setItem("code_verifier", res.data.code_verifier);
                }

              } else {
                this.ssoProvider = undefined;
              }
            },
            (err) => {
              console.log(err);
            }
          );
      } else {
        if (this.sub) {
          this.isSSOLogin = false;
          this.ssoProvider = undefined;
          this.sub.unsubscribe();
        }
      }
    }); */
  }

  checkIfSSO(event) {
    if (this.loginForm.get('email').valid) {
      if (this.userData.isSSO) {
        this.isSSOLogin = true;
      }
    }
  }
  usePassword() {
    this.isSSOLogin = false;
  }
  getUserdetails(email) {
    this.http.get(`${environment.baseurl}/get-userData/${email}`).subscribe(
      (res: any) => {
        console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  login() {
    this.isLoading = true;
    if (this.loginForm.valid) {
      const payload = {
        email: this.loginForm.get('email').value,
        password: this.loginForm.get('password').value,
      };
      this.http
        .post(`${environment.baseurl}/auth/user/login`, payload)
        .subscribe(
          (res: any) => {
            if (
              window.deferredPrompt !== null &&
              window.deferredPrompt !== undefined
            ) {
              window.deferredPrompt.prompt();
            }
            localStorage.setItem('authToken', res.accessToken);
            this.getMyProfile();
          },
          (err) => {
            console.log(err);
            this.isLoading = false;
            this.openSnackBar(err.error.message);
          }
        );
    }
  }

  async loginWithSSo() {
    this.isLoading = true;
    if (this.loginForm.get('email').valid) {

      if(this.ssoProvider === 'okta') {
        localStorage.setItem('logintype', this.ssoProvider);
        this.router.navigate(['/auth/login']);
      } else {
        localStorage.setItem('logintype', 'sso');
        window.location.href = this.ssoLink;
      }
    }
  }

  getMyProfile() {
    const authToken = this.authService.getAccessToken();
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
          this.isLoading = false;

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
      navigatTo = '/dashboard/my-dashboard';
    }
    const authToken = this.authService.getAccessToken();
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
      maxHeight:'420px',
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
      this.router.navigate(['/dashboard/my-dashboard']);
    });
  }

  showpassword() {
    this.show = !this.show;
  }
  forgotPassword() {
    this.router.navigate(['/auth/forgot-password']);
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Ok', {
      duration: 1500,
    });
  }
}
