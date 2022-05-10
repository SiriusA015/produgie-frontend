import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { EventComponent } from 'src/app/event/event.component';
import { eventRoutes } from 'src/app/event/event.routes';
import { TokenInterceptor } from 'src/app/services/interceptors/token.interceptor';
import { EventCancelComponent } from './event-cancel/event-cancel.component';
import { EventDetailComponent } from './event-detail/event-detail.component';

@NgModule({
	declarations: [
		EventComponent,
		EventDetailComponent,
		EventCancelComponent,
	],
	imports: [
		FormsModule,
		CommonModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,
		MatSnackBarModule,
		MatPaginatorModule,
		MatSelectModule,
		MatProgressBarModule,
		RouterModule.forChild(eventRoutes),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true,
		}
	],
})

export class EventModule { }
