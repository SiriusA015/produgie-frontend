import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { HelipopperModule } from '@ngneat/helipopper';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from '../services/interceptors/token.interceptor';
import { SharedModule } from '../shared/shared.module';
import { BlankUiLayoutComponent } from './layout/blank-ui-layout/blank-ui-layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './layout/loader/loader.component';
import { MainComponent } from './layout/main/main.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MainComponent,
    HeaderComponent,
    LoaderComponent,
    BlankUiLayoutComponent,
  ],
  imports: [CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    HttpClientModule,
    SharedModule,
    OverlayModule,
    MatSnackBarModule,
    HelipopperModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  exports: [
    LoaderComponent,
    LayoutComponent,
    BlankUiLayoutComponent
  ]
})
export class UiModule {}
