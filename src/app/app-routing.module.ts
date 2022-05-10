import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { DbdatawipeoutComponent } from './dbdatawipeout/dbdatawipeout.component';
import { ErrorComponent } from './extras/error/error.component';
import { NotFoundComponent } from './extras/not-found/not-found.component';
import { OktaAuthGuard } from './shared/guards/okta-auth-guard';
import { BlankUiLayoutComponent } from './ui/layout/blank-ui-layout/blank-ui-layout.component';
import { LayoutComponent } from './ui/layout/layout.component';
import { UiModule } from './ui/ui.module';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'auth',
		pathMatch: 'full'
	},
	{
		path: 'error',
		component: ErrorComponent
	},
	{
		path: 'not-found',
		component: NotFoundComponent
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
	},

	{ path: 'wipeout', component: DbdatawipeoutComponent },

	{
		path: 'dashboard',
		canActivate: [OktaAuthGuard],
		component: LayoutComponent,
		loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
	},
	{
		path: 'sprint',
		canActivate: [OktaAuthGuard],
		component: BlankUiLayoutComponent,
		children: [
			{
				path: '',
				component: LayoutComponent,
				loadChildren: () => import('./sprint/sprint.module').then(m => m.SprintModule),
			}
		]
	},
	{
		path: 'design',
		canActivate: [OktaAuthGuard],
		component: BlankUiLayoutComponent,
		children: [
			{
				path: '',
				component: LayoutComponent,
				loadChildren: () => import('./design/design.module').then(m => m.DesignModule),
			}
		]
	},
	{
		path: 'explore',
		canActivate: [OktaAuthGuard],
		component: LayoutComponent,
		loadChildren: () => import('./explore/explore.module').then(m => m.ExploreModule),
	},
	{
		path: 'event',
		// canActivate: [OktaAuthGuard],
		component: LayoutComponent,
		loadChildren: () => import('./event/event.module').then(m => m.EventModule),
	},
	{
		path: 'development',
		loadChildren: () => import('./development/development.module').then(m => m.DevelopmentModule),
	},
	{
		path: 'growth-leader',
		loadChildren: () => import('./growth-leader/growth-leader.module').then(m => m.GrowthLeaderModule),
	},
	{
		path: 'profile',
		canActivate: [OktaAuthGuard],
		component: LayoutComponent,
		loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
	},
	{
		path: 'gl360',
		component: BlankUiLayoutComponent,
		children: [
			{
				path: '',
				component: LayoutComponent,
				loadChildren: () => import('./gl360/gl360.module').then(m => m.Gl360Module),
			}
		]
	},
	{
		path: 'guest',
		loadChildren: () => import('./guest-member/guest-member.module').then(m => m.GuestMemberModule),
	},
	{
		path: 'team-development',
		loadChildren: () => import('./Team-Development/teamdevelopment.module').then(m => m.TeamdevelopmentModule),
	},
	{
		path: 'okta/callback',
		component: OktaCallbackComponent
	},
	{
		path: 'teams',
		component: LayoutComponent,
		loadChildren: () => import('./teams/teams.module').then(m => m.TeamsModule),
	},
	{
		path: '**',
		redirectTo: 'not-found'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			onSameUrlNavigation: 'reload'
		}),

		UiModule
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
