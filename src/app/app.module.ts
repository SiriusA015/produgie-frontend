import {
	NgxMatDateFormats,
	NgxMatDatetimePickerModule,
	NgxMatNativeDateModule,
	NgxMatTimepickerModule,
	NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { HelipopperModule } from '@ngneat/helipopper';
import {
	OktaAuthGuard,
	OktaAuthModule,
	OktaAuthService,
	OKTA_CONFIG,
} from '@okta/okta-angular';
import { Angulartics2Module } from 'angulartics2';
// import { NgxGoogleAnalyticsModule, NgxGoogleAnalyticsRouterModule } from 'ngx-google-analytics';
import LogRocket from 'logrocket';
import { NgxSpinnerModule } from 'ngx-spinner';
import LogrocketFuzzySanitizer from '../app/shared/custom-plugins/password-mask';
import { environment } from '../environments/environment';
import gitInfo from '../git-version.json';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DbdatawipeoutComponent } from './dbdatawipeout/dbdatawipeout.component';
import { ErrorComponent } from './extras/error/error.component';
import { NotFoundComponent } from './extras/not-found/not-found.component';
import { PRIVATE_FIELDS_NAME } from './shared/models/constants';
import { WindowRef } from 'src/app/window.service';

if (environment.enableLogRocket) {
	const { requestSanitizer, responseSanitizer } =
		LogrocketFuzzySanitizer.setup(PRIVATE_FIELDS_NAME);

	LogRocket.init(environment.logrocketUserId, {
		release: gitInfo.hash,
		network: {
			requestSanitizer,
			responseSanitizer,
		},
	});
}

let uid = localStorage.getItem('user_id');
LogRocket.identify(uid, {
	name: localStorage.getItem('userName'),
	email: localStorage.getItem('email'),
	// Add your own custom user variables here, ie:
	userType: localStorage.getItem('user-type'),
	subscriptionType: 'pro',
});

FullCalendarModule.registerPlugins([
	// register FullCalendar plugins
	dayGridPlugin,
	interactionPlugin,
]);

const oktaConfig = {
	issuer: environment.oktaIssuer,
	redirectUri: environment.oktaRedirectUrl,
	clientId: environment.oktaClientId,
	scopes: ['openid', 'profile', 'email'],
	pkce: environment.oktaPkce,
};

const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
	parse: {
		dateInput: 'l, LTS',
	},
	display: {
		dateInput: 'l, LTS',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};
@NgModule({
	declarations: [
		AppComponent,
		ErrorComponent,
		NotFoundComponent,
		DbdatawipeoutComponent,
	],
	imports: [
		RouterModule,
		MatGridListModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		FullCalendarModule,
		MatBottomSheetModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatMomentDateModule,
		NgxMatDatetimePickerModule,
		NgxMatTimepickerModule,
		NgxMatNativeDateModule,
		FormsModule,
		MatCardModule,
		MatButtonModule,
		MatTooltipModule,
		NgxSpinnerModule,
		HelipopperModule.forRoot(),
		MatSelectCountryModule.forRoot('de'),
		OktaAuthModule,
		// NgxGoogleAnalyticsModule.forRoot(environment.ga),
		// NgxGoogleAnalyticsRouterModule.forRoot({ include: [ '/*' ] }),
		Angulartics2Module.forRoot({
			gst: {
				trackingIds: [environment.gaTrackingId],
				customMap: {
					dimension1: 'userId',
					dimension2: 'tenant_id',
					dimension3: 'exclude_for_analytics',
				},
			},
		}),
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: environment.production,
		}),
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],

	providers: [
		{
			provide: NGX_MAT_DATE_FORMATS,
			useValue: CUSTOM_DATE_FORMATS,
		},
		{
			provide: OKTA_CONFIG,
			useValue: oktaConfig,
		},
		OktaAuthService,
		OktaAuthGuard,
		WindowRef,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
