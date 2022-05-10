import { Routes } from '@angular/router';
import { EventComponent } from './event.component';

export const eventRoutes: Routes =
	[
		{
			path: '',
			redirectTo: 'dashboard',
		},
		{
			path: 'dashboard',
			component: EventComponent
		},
	]
