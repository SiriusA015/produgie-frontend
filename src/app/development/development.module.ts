import { developemntRoutes } from './development.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevPlanComponent } from './components/dev-plan/dev-plan.component';
import { FadOverviewComponent } from './components/dev-plan/fad-overview/fad-overview.component';
import { SprintOverviewComponent } from './components/dev-plan/sprint-overview/sprint-overview.component';
import { SprintDurationOverviewComponent } from './components/dev-plan/sprint-duration-overview/sprint-duration-overview.component';
import { AboOverviewComponent } from './components/dev-plan/abo-overview/abo-overview.component';
import { SprintCrewOverviewComponent } from './components/dev-plan/sprint-crew-overview/sprint-crew-overview.component';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { NguCarouselModule } from '@ngu/carousel';
import { CustomFormsModule } from 'ngx-custom-validators';
import { MatMenuModule } from '@angular/material/menu';
import { HelipopperModule } from '@ngneat/helipopper';
import { AdviceFormComponent } from './components/dev-plan/modals/advice-form/advice-form.component';
import { DevPlanFeedbackComponent } from './components/dev-plan-feedback/dev-plan-feedback.component';
import { FeedbackFormComponent } from './components/dev-plan/modals/feedback-form/feedback-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { DevPlanCrewViewComponent } from './components/dev-plan-crew-view/dev-plan-crew-view.component';
import { DevLoaderComponent } from './components/dev-loader/dev-loader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { DevPanViewVrComponent } from './components/dev-pan-view-vr/dev-pan-view-vr.component';
import { DevPlanFinalFeedbackComponent } from './components/dev-plan-final-feedback/dev-plan-final-feedback.component';
import { FinalFeedbackFormComponent } from './components/dev-plan/modals/final-feedback-form/final-feedback-form.component';
import { DesignModule } from '../design/design.module';


@NgModule({
  declarations: [
    DevPlanComponent,
    FadOverviewComponent,
    SprintOverviewComponent,
    SprintDurationOverviewComponent,
    AboOverviewComponent,
    SprintCrewOverviewComponent,
    AdviceFormComponent,
    DevPlanFeedbackComponent,
    FeedbackFormComponent,
    DevPlanCrewViewComponent,
    DevLoaderComponent,
    ThankYouComponent,
    DevPanViewVrComponent,
    DevPlanFinalFeedbackComponent,
    FinalFeedbackFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(developemntRoutes),
    MatIconModule,
    DesignModule,
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
export class DevelopmentModule {}
