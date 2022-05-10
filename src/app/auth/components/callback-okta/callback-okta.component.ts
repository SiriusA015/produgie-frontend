import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import jwt_decode from 'jwt-decode';
import LogRocket from 'logrocket';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PRIVATE_FIELDS_NAME } from 'src/app/shared/models/constants';
import { AuthService } from 'src/app/shared/service/auth.service';
import { environment } from 'src/environments/environment';
import gitInfo from '../../../../git-version.json';
import LogrocketFuzzySanitizer from '../../../shared/custom-plugins/password-mask';
import { CronofyAlertComponent } from '../cronofy-alert/cronofy-alert.component';
import { WarningAlertComponent } from '../warning-alert/warning-alert.component';

const jwt = require('jwt-encode');

@Component({
	selector: 'app-callback-okta',
	templateUrl: './callback-okta.component.html',
	styleUrls: ['./callback-okta.component.scss'],
})
export class CallbackOktaComponent implements OnInit {
	error: string;
	errorDescription: string;
	accessToken: string;
	idToken: string;
	paramData: any;
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
		private authService: AuthService,
		private angulartics2GoogleAnalytics: Angulartics2GoogleGlobalSiteTag
	) {
		this.paramData = localStorage.getItem('autoRedirectUrl');
		localStorage.removeItem('autoRedirectUrl');
	}

	async ngOnInit() {
		this.accessToken = await this.authService.getAccessToken();

		this.idToken = await this.authService.getIdToken();

		if (!this.accessToken) {
			await this.authService.signOut();
		}

		const decodedToken: any = jwt_decode(this.accessToken);

		const roles = JSON.stringify(decodedToken.Groups);

		localStorage.setItem('roles', roles);

		localStorage.setItem('authToken', this.accessToken);

		await this.getMyProfile();
		await this.authService.getFreshDeskToken();
		await this.userDetails();
	}

	async getMyProfile(): Promise<any> {
		// const authToken = localStorage.getItem('authToken');
		return new Promise(async (resolve, reject) => {
			this.http
				.get(`${environment.baseurl}/user/me`, {
					headers: {
						Authorization: `Bearer ${this.accessToken}`,
					},
				})
				.subscribe(
					(res: any) => {
						const username = res.fullName;
						localStorage.setItem('userName', username);
						localStorage.setItem('preferedName', res.salutation);
						localStorage.setItem('email', res.email);
						localStorage.setItem('orgId', res.orgId);
						localStorage.setItem('oktaUserId', res.oktaUserId);
						localStorage.setItem('client_id', res.orgId);
						localStorage.setItem('user_id', res.id);
						localStorage.setItem('user-type', 'authenticated');
						localStorage.setItem(
							'picture',
							res.avatar ? res.avatar : 'avatar_10'
						);
						localStorage.setItem('imageurl', res.imageUrl);

						if (environment.enableLogRocket) {
							const { requestSanitizer, responseSanitizer } =
								LogrocketFuzzySanitizer.setup(
									PRIVATE_FIELDS_NAME
								);
							LogRocket.init(environment.logrocketUserId, {
								release: gitInfo.hash,
								network: {
									requestSanitizer,
									responseSanitizer,
								},
							});
						}

						if (environment.gaTrackingId) {
							let exclude_for_analytics = true;

							if (environment.production == true) {
								exclude_for_analytics =
									localStorage.getItem(
										'exclude_for_analytics'
									) === 'true';
							}

							this.angulartics2GoogleAnalytics.setUsername(
								res.oktaUserId
							);

							this.angulartics2GoogleAnalytics.setUserProperties({
								user_properties: {
									userId: res.oktaUserId,
									tenant_id: res.orgId,
									exclude_for_analytics:
										exclude_for_analytics,
								},
							});
							this.angulartics2GoogleAnalytics.eventTrack(
								'login'
							);
						}

						let uid = res.id;
						LogRocket.identify(uid, {
							name: username,
							email: res.email,
							// Add your own custom user variables here, ie:
							subscriptionType: 'pro',
						});

						this.isHandset$.subscribe((data) => {
							if (data) {
								this.checkCronofyAuthorization('handset');
							} else {
								this.checkCronofyAuthorization('web');
							}
						});
						resolve(true);
					},
					(err) => {
						this.error = err.error.message;
						this.errorDescription = err.error.message;

						if (err.status == 500) {
							this.error = err.statusText;
							this.errorDescription = err.message;
						}
						resolve(false);
					}
				);
		});
	}

	async checkCronofyAuthorization(deviceType) {
		let navigatTo;

		if (deviceType === 'handset') {
			const redirect = localStorage.getItem('redirect');
			if (redirect == 'teams') {
				navigatTo = '/teams/sprint';
			} else {
				if (this.paramData) {
					navigatTo = this.paramData;
				} else {
					navigatTo = '/sprint';
				}
			}
		} else {
			localStorage.setItem('activeModule', 'LEAD');
			if (this.paramData) {
				navigatTo = this.paramData;
			} else {
				navigatTo = '/dashboard/my-dashboard';
			}
		}

		// const authToken = localStorage.getItem('authToken');
		const headers = {
			headers: {
				Authorization: `Bearer ${this.accessToken}`,
			},
		};
		this.http
			.get(environment.baseurl + `/cronofy/check-user-all`, headers)
			.subscribe((result: any) => {
				if (result.status === 400 || result.status === 401) {
					this.showWarning(
						'Something went wrong with cronofy authorization'
					);
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
						const activeModule =
							localStorage.getItem('activeModule');
						const redirect = localStorage.getItem('redirect');
						if (activeModule == 'TEAM' || redirect === 'teams') {
							localStorage.removeItem('redirect');
							location.href = `${location.origin}/teams/sprint/dashboard`;
							// this.router.navigate(['/teams/sprint/dashboard']);
						} else {
							if (this.paramData) {
								location.href = `${
									location.origin + this.paramData
								}`;
							} else {
								location.href = `${location.origin}/sprint`;
							}

							// this.router.navigate(['/sprint']);
						}
					} else {
						if (this.paramData) {
							location.href = `${
								location.origin + this.paramData
							}`;
						} else {
							location.href = `${location.origin}/dashboard/my-dashboard`;
						}

						// this.router.navigate(['/dashboard/my-dashboard']);
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
			localStorage.setItem('activeModule', 'LEAD');
			if (this.paramData) {
				this.router.navigate([this.paramData]);
			} else {
				this.router.navigate(['/dashboard/my-dashboard']);
			}
		});
	}

	async userDetails() {
		const headers = {
			headers: new HttpHeaders().set(
				'Authorization',
				`Bearer ${this.accessToken}`
			),
		};
		return new Promise(async (resolve, reject) => {
			this.http
				.get(environment.teamBaseUrl + `/users/getUserDetails`, headers)
				.subscribe(
					(res: any) => {
						localStorage.setItem('client_id', res.client_id);
						localStorage.setItem('user_id', res.id);
						localStorage.setItem(
							'exclude_for_analytics',
							res.excludeForAnalytics
						);
						resolve(true);
					},
					(err: any) => {
						resolve(false);
						/* this.error = err.error.errorMessage;
            this.errorDescription = err.message;

            if(err.status == 500) {
              this.error = err.statusText;
              this.errorDescription = err.message;
            } */
					}
				);
		});
	}

	async retry() {
		await this.authService.signOut();
	}
}
