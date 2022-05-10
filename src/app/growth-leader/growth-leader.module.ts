import { GlaRatingComponent } from './components/gla-rating/gla-rating.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {glRoutes} from './growth-leader.routes';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { HelipopperModule } from '@ngneat/helipopper';
import { NguCarouselModule } from '@ngu/carousel';
import { CustomFormsModule } from 'ngx-custom-validators';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GlaRatingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(glRoutes),
    MatIconModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    OverlayModule,
    NguCarouselModule,
    CustomFormsModule,
    MatMenuModule,
    HelipopperModule.forRoot(),
    MatRadioModule,
    MatBadgeModule,
    MatProgressBarModule
  ]
})
export class GrowthLeaderModule { }
