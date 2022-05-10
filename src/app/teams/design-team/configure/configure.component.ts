import { ActionComponent } from './action/action.component';
import { ConfigService } from './../../../shared/service/config.service';
import { DataService } from 'src/app/design/service/data.service';
import { Outcome } from 'src/models/Outcome';
import { Action } from 'src/models/Action';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Behaviour } from 'src/models/Behaviour';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DesignService } from '../design.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {
  @ViewChild(ActionComponent)
  actionComponent: ActionComponent;
  // selectedActions: Set<number> = new Set([]);
  selectedBehaviours: Set<number> = new Set([]);
  selectedOutcomes: Set<number> = new Set([]);
  // selectedActionsCustom : Set<number> = new Set([]);
  assessmentId;
  message: any;
  // tslint:disable-next-line:variable-name
  sprintId;
  isEdit = false;
  actions: Action[] = [];
  customActions: Action[] = [];
  behaviours: Behaviour[] = [];
  customBehaviours: Behaviour[] = [];
  outcomes: Outcome[] = [];
  customOutcomes: Outcome[] = [];
  leadList: any;
  selectedActions: any = [];
  selectedActionsCustom: any = [];
  selectedBehaviour: any = [];
  selectedBehaviourCustom: any = [];
  selectedOutcome: any = [];
  selectedOutcomeCustom: any = [];
  previousSelectedActions: Set<number> = new Set([]);
  previousSelectedBehaviours: Set<number> = new Set([]);
  previousSelectedOutcomes: Set<number> = new Set([]);

  constructor(
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    private designService: DesignService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.sprintId = localStorage.getItem('sprint_Id');
    this.dataService.sharedMessage.subscribe(
      (message:any) => {
        // if(message['isEdit']) {
        //   this.getSelectedDataForEdit();
        // }
        (this.message = message)
      }
    );

    this.dataService.isEditable?.subscribe(
      (status:boolean) => {
        console.log("status", status);
        if(status == true) {
          this.getSelectedDataForEdit();
        }
      });


    this.getabo();
    this.dataService.nextMessage({
      sprint: true,
      faddev: false,
      fadfocus: false,
      frequency: false,
      isConfirm: false,
      crew: false,
      sprintShow: false,
      action: true,
      step: 2,
      // isEdit: false
    });
  }

  getabo() {
    this.configService.setConfig({ isLoader: true });
    this.designService.getAction(this.sprintId).subscribe((actionresult: any) => {
      this.actions = actionresult;

    })
    this.designService.getBehaviour(this.sprintId).subscribe((behaviourresult: any) => {
      this.behaviours = behaviourresult;
    })
    this.designService.getOutcome(this.sprintId).subscribe((outcomeresult: any) => {
      this.outcomes = outcomeresult;
    })

    this.configService.setConfig({ isLoader: false });
  }
  onCustomAdded(event) {
    if (event.added) {
      this.getabo();
    }
  }

  onSelectAction(event) {
    this.selectedActionsCustom = [];
    this.selectedActions = [];
    event.forEach(selectedId => {
      const obj = this.actions.find((value)=> value.id === selectedId);

      if(obj) {
        if(obj.isCustom) {
          this.selectedActionsCustom.push(obj.id);
        } else {
          this.selectedActions.push(obj.id)
        }
      }
    });
    /* let actionId = Array.from(event).pop();
    let objAction = this.actions.filter(function (value) {
      if (value.id == actionId) return value;
    });

    if (objAction[0].isCustom == true) {
      this.selectedActionsCustom.push(actionId);
    } else {
      this.selectedActions.push(actionId)
    } */
  }
  onSelectBehaviour(event) {
    this.selectedBehaviourCustom = [];
    this.selectedBehaviour = [];

    event.forEach(selectedId => {
      const obj = this.behaviours.find((value)=> value.id === selectedId);

      if(obj) {
        if(obj.isCustom) {
          this.selectedBehaviourCustom.push(obj.id);
        } else {
          this.selectedBehaviour.push(obj.id)
        }
      }
    });
    /* let BehaviourId = Array.from(event).pop();
    let objbehaviour = this.behaviours.filter(function (value) {
      if (value.id == BehaviourId) return value;
    });

    if (objbehaviour[0].isCustom == true) {
      this.selectedBehaviourCustom.push(BehaviourId);
    } else {
      this.selectedBehaviour.push(BehaviourId)
    } */
  }
  onSelectOutcome(event) {
    this.selectedOutcomeCustom = [];
    this.selectedOutcome = [];

    event.forEach(selectedId => {
      const obj = this.outcomes.find((value)=> value.id === selectedId);

      if(obj) {
        if(obj.isCustom) {
          this.selectedOutcomeCustom.push(obj.id);
        } else {
          this.selectedOutcome.push(obj.id)
        }
      }
    });
    /* let outcomeId = Array.from(event).pop();
    let objoutcome = this.outcomes.filter(function (value) {
      if (value.id == outcomeId) return value;
    });
    if (objoutcome[0]?.isCustom == true) {
      this.selectedOutcomeCustom.push(outcomeId);
    } else {
      this.selectedOutcome.push(outcomeId)
    } */
  }

  gotToNext() {
    this.selectedOutcome = this.selectedOutcome.filter(function( element ) {
      return element !== undefined || element !=null;
   });
    if (this.selectedActions.length == 0 || this.selectedBehaviour.length == 0 || this.selectedOutcome.length == 0) {
      return;
    }

    this.configService.setConfig({ isLoader: true });
    if (this.message?.isEdit) {
      this.dataService.nextMessage({ isEdit: false });
      this.dataService.setActionEditable(false);
      this.router.navigate(['/teams/design/dev-plan']);
      let data = {
        action_id: [...new Set(this.selectedActions)],
        behavior_id: [...new Set(this.selectedBehaviour)],
        outcome_id: [...new Set(this.selectedOutcome)],
        custom_action_id: [...new Set(this.selectedActionsCustom)],
        custom_behavior_id: [...new Set(this.selectedBehaviourCustom)],
        custome_outcome_id: [...new Set(this.selectedOutcomeCustom)],
        assessment_id:localStorage.getItem('assesmentId'),
        selected_sprint_id: localStorage.getItem('sprint_Id'),
        team_id:localStorage.getItem('selectedTeamId')
      }

      this.designService.addSelectedActionData(data).subscribe((res: any) => {
        this.configService.setConfig({ isLoader: false });
        // this.router.navigate(['/teams/design/teams-sprint-crew'], {
        //   // state: { example: type }
        // });
      },
        err => {
          this.configService.setConfig({ isLoader: false });
          this.toastr.error('error', err?.error?.errorMessage || "Something went wrong", {
            timeOut: 3000,
          });
        }
      )


    } else {
      let type = false;
      let data = {
        action_id: [...new Set(this.selectedActions)],
        behavior_id: [...new Set(this.selectedBehaviour)],
        outcome_id: [...new Set(this.selectedOutcome)],
        custom_action_id: [...new Set(this.selectedActionsCustom)],
        custom_behavior_id: [...new Set(this.selectedBehaviourCustom)],
        custome_outcome_id: [...new Set(this.selectedOutcomeCustom)],
        assessment_id:localStorage.getItem('assesmentId'),
        selected_sprint_id: localStorage.getItem('sprint_Id'),
        team_id:localStorage.getItem('selectedTeamId')
      }
      this.designService.addSelectedActionData(data).subscribe((res: any) => {
        this.configService.setConfig({ isLoader: false });
        this.router.navigate(['/teams/design/teams-sprint-crew'], {
          state: { example: type }
        });
      },
        err => {
          this.configService.setConfig({ isLoader: false });
          this.toastr.error('error', err?.error?.errorMessage || "Something went wrong", {
            timeOut: 3000,
          });

        }
      )

      // }
    }
  }

  getSelectedDataForEdit() {
    this.designService.getAllSelected(this.sprintId).subscribe((res:any)=>{

      res.actionList.forEach(element => {
        this.previousSelectedActions.add(element.actionId);
      });
      this.onSelectAction(this.previousSelectedActions);

      res.behaviourList.forEach(element => {
        this.previousSelectedBehaviours.add(element.behaviourId);
      });
      this.onSelectBehaviour(this.previousSelectedBehaviours);

      res.outcomeList.forEach(element => {
        this.previousSelectedOutcomes.add(element.outcomeId);
      });
      this.onSelectOutcome(this.previousSelectedOutcomes);
    },error=>{})
  }
}
