import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamAdviceComponent } from './team-advice/team-advice.component';
import { TeamFeebackComponent } from './team-feeback/team-feeback.component';

const routes: Routes = [

  {
    path: 'advice/:uuid',
    component: TeamAdviceComponent
  },
  {
    path: 'feedback/:uuid',
    component: TeamFeebackComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamdevelopmentRoutingModule { }
