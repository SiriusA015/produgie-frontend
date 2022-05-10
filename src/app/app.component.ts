import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { AuthService } from 'src/app/shared/service/auth.service';
import { environment } from 'src/environments/environment';
import { WindowRef } from './window.service';

declare const window: any;
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'Project-Grip';
	constructor(
		router: Router,
		private winRef: WindowRef,
		private authService: AuthService,
		private angulartics2GoogleAnalytics: Angulartics2GoogleGlobalSiteTag
	) {
		const gTagManagerScript = document.createElement('script');
		gTagManagerScript.async = true;
		gTagManagerScript.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gaTrackingId}`;
		document.head.appendChild(gTagManagerScript);

		const gaScript = document.createElement('script');
		gaScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        `;
		document.head.appendChild(gaScript);

		this.angulartics2GoogleAnalytics.startTracking();

		const loggedInUserEmail = localStorage.getItem('email');
		let loggedInUserId = localStorage.getItem('oktaUserId');
		let tenantId = localStorage.getItem('orgId');
		const userType = localStorage.getItem('user-type');

		let userSaveToAppcues: string;

		if (loggedInUserEmail === undefined || loggedInUserEmail === null || loggedInUserEmail === '') {
			userSaveToAppcues = 'guest' + Math.floor(Math.random() * 10000) + 1;;
		} else {
			userSaveToAppcues = loggedInUserEmail;
		}

		winRef.nativeWindow?.Appcues?.identify(userSaveToAppcues, // unique, required
			{
				email: userSaveToAppcues,
			});

		router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				winRef.nativeWindow.Appcues.page();
			}
		});

		if (loggedInUserEmail) {
			let freshDeskToken = localStorage.getItem('freshDeskToken');
			window.FreshworksWidget('authenticate', {
				token: freshDeskToken,
				callback: this.authService.getFreshDeskToken(),
			});
		}

		let exclude_for_analytics;

		if (environment.gaTrackingId) {
			exclude_for_analytics = true;

			if (environment.production == true) {
				exclude_for_analytics =
					localStorage.getItem('exclude_for_analytics') === 'true';
			}
		}

		if (userType === 'guest') {
			loggedInUserId = loggedInUserEmail;
			// tenantId = 'g-';
		}

		this.angulartics2GoogleAnalytics.setUsername(loggedInUserId);

		this.angulartics2GoogleAnalytics.setUserProperties({
			user_properties: {
				userId: loggedInUserId,
				tenant_id: tenantId,
				exclude_for_analytics: exclude_for_analytics,
			},
		});
		this.angulartics2GoogleAnalytics.eventTrack('refreshed', {});
	}
}

export function createAppComponent(router: Router) {
	return new AppComponent(router, this.winRef, this.authService, this.angulartics2GoogleAnalytics);
}
