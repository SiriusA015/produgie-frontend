import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { environment } from '../../../environments/environment';

declare const window: any;
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	logintype: string;

	constructor(
		private http: HttpClient,
		private router: Router,
		public oktaAuth: OktaAuthService
	) {
		this.logintype = localStorage.getItem('logintype');
	}

	isAuthenticated() {
		if (this.logintype == 'sso') {
			if (localStorage.getItem('authToken')) {
				return true;
			} else {
				return false;
			}
		}
		return this.oktaAuth.isAuthenticated();
	}

	getAccessToken() {
		if (this.logintype == 'sso') {
			return localStorage.getItem('authToken');
		}
		return this.oktaAuth.getAccessToken();
	}

	getIdToken() {
		if (this.logintype == 'sso') {
			return localStorage.getItem('idToken');
		}
		return this.oktaAuth.getIdToken();
	}

	async getFreshDeskToken() {
		const authToken = localStorage.getItem('authToken');
		const headers = {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		};

		let payload = {
			name: localStorage.getItem('userName'),
			email: localStorage.getItem('email'),
		};

		return new Promise(async (resolve, reject) => {
			this.http
				.post(
					`${environment.baseurl}/user/freshdesk-token`,
					payload,
					headers
				)
				.subscribe(
					(res: any) => {
						localStorage.setItem('freshDeskToken', res.token);
						window.FreshworksWidget('authenticate', {
							token: res.token,
						});
						resolve(true);
					},
					(err) => {
						console.log('error block', err);
						resolve(false);
					}
				);
		});
	}

	async signOut() {
		localStorage.clear();
		window.FreshworksWidget('logout');
		return this.oktaAuth.signOut({
			postLogoutRedirectUri: '/auth/login',
		});
	}

	handleUnauthorized() {
		let widget = new OktaSignIn({
			el: '#okta-signin-container',
			baseUrl: environment.oktaBaseUrl,
			authParams: {
				pkce: environment.oktaPkce,
			},
			clientId: environment.oktaClientId,
			redirectUri: environment.oktaRedirectUrl,
			features: {
				idpDiscovery: true,
			},
			idpDiscovery: {
				requestContext: window.location.href,
			},
		});

		widget.authClient.session.exists().then((sessionExists) => {
			if (sessionExists) {
				widget.authClient.token.getWithoutPrompt().then((response) => {
					// get a new token via okta service
					widget.authClient.tokenManager.setTokens(response.tokens);
					// did we get a new token retry previous request
					const authToken = this.getAccessToken();
					localStorage.setItem('authToken', authToken);
					return sessionExists;
				});
			} else {
				// If we don't get a new token, we are in trouble so logout.
				return this.signOut();
			}
		});
	}
}
