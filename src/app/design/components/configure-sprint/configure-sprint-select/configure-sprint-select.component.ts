import { ConfigureSprintActionComponent } from './../configure-sprint-action/configure-sprint-action.component';
import { ConfigService } from './../../../../shared/service/config.service';
import { DataService } from './../../../service/data.service';
import { Outcome } from './../../../../../models/Outcome';
import { Action } from './../../../../../models/Action';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Behaviour } from 'src/models/Behaviour';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesignService } from '../../../service/design/design.service';

const baseUrl = environment.baseurl;

@Component({
  selector: 'app-configure-sprint-select',
  templateUrl: './configure-sprint-select.component.html',
  styleUrls: ['./configure-sprint-select.component.scss'],
})
export class ConfigureSprintSelectComponent implements OnInit, AfterViewInit {
  @ViewChild(ConfigureSprintActionComponent)
  actionComponent: ConfigureSprintActionComponent;
  selectedActions: Set<number> = new Set([]);
  selectedBehaviours: Set<number> = new Set([]);
  selectedOutcomes: Set<number> = new Set([]);

  assessmentId;
  message: any;
  isEditState: boolean;
  // tslint:disable-next-line:variable-name
  sprintId;
  isEdit = false;
  actions: Action[] = [];
  customActions: Action[] = [];
  behaviours: Behaviour[] = [];
  customBehaviours: Behaviour[] = [];
  outcomes: Outcome[] = [];
  customOutcomes: Outcome[] = [];
  // enableNext: {};
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private configService: ConfigService,
    private _snackBar: MatSnackBar,
    private designService: DesignService
  ) {}

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.sprintId = params.id;
    });
    this.dataService.sharedMessage.subscribe(
      (message) =>{
        this.message = message
        this.isEditState = this.message.isEditState;
        // this.enableNext = message;
      }

    );
    // this.getabo();
    this.dataService.nextMessage({
      sprint: true,
      faddev: false,
      fadfocus: false,
      frequency: false,
      isConfirm: false,
      crew: false,
      sprintShow:false,
      action:true,
      step: 2,
    });
  }
  ngAfterViewInit() {
    this.getabo();
  }
  getabo() {
    this.configService.setConfig({ isLoader: true });
    this.http.get(`${baseUrl}/sprint/get-abo`).subscribe(
      (res: any) => {
        console.log(res.message);
        this.actions = res.message.action.map((o: Action) => {
          console.log(o);
          const returnObj: Action = {
            ...o,
            icon: o.theme1 ? o.theme1 : 'Empty',
            color: '#3AA76D',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          return returnObj;
        });
        this.customActions = res.message.customAction.map((o: Action) => {
          const returnObj: Action = {
            ...o,
            icon: 'Empty',
            color: '#3AA76D',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          return returnObj;
        });
        this.behaviours = res.message.behaviour.map((o: Behaviour) => {
          const returnObj: Behaviour = {
            ...o,
            icon: o.theme1 ? o.theme1 : 'Empty',
            color: '#3AA76D',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          return returnObj;
        });
        this.customBehaviours = res.message.customBehaviour.map(
          (o: Behaviour) => {
            const returnObj: Behaviour = {
              ...o,
              icon: 'Empty',
              color: '#3AA76D',
              iconclass: 'pg-txt-orange-strength',
              bgclass: 'pg-bg-orange-strength',
            };
            return returnObj;
          }
        );
        this.outcomes = res.message.outcome.map((o: Outcome) => {
          const returnObj: Outcome = {
            ...o,
            icon: o.theme1 ? o.theme1 : 'Empty',
            color: '#3AA76D',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          return returnObj;
        });
        this.customOutcomes = res.message.customOutcome.map((o: Outcome) => {
          const returnObj: Outcome = {
            ...o,
            icon: 'Empty',
            color: '#3AA76D',
            iconclass: 'pg-txt-orange-strength',
            bgclass: 'pg-bg-orange-strength',
          };
          return returnObj;
        });
        this.actionComponent.getSelected();
        this.configService.setConfig({ isLoader: false });
      },
      (err) => console.log(err)
    );
  }
  onCustomAdded(event) {
    if (event.added) {
      this.getabo();
    }
  }
  onSelectAction(event) {
    this.selectedActions = event;
    this.designService.configureSprint({selectedActions: Array.from(this.selectedActions)});
  }
  onSelectBehaviour(event) {
    this.selectedBehaviours = event;
    this.designService.configureSprint({selectedBehaviours: Array.from(this.selectedBehaviours)});
  }
  onSelectOutcome(event) {
    this.selectedOutcomes = event;
    this.designService.configureSprint({selectedOutcomes: Array.from(this.selectedOutcomes)});
  }
  gotToSave() {
    if (
      this.selectedActions.size > 0 &&
      this.selectedBehaviours.size > 0 &&
      this.selectedOutcomes.size > 0
    ) {
      this.configService.setConfig({ isLoader: false });
      this.dataService.nextMessage({ isEdit: false });
      this.router.navigate(['/design/sprint-final']);
    }else{
      this._snackBar.open('Please Select at least one from each action, behavior and outcome', '', {
        duration: 3000,
      });
    }
  }

  gotToNext() {
    if (
      this.selectedActions.size > 0 &&
      this.selectedBehaviours.size > 0 &&
      this.selectedOutcomes.size > 0
    ) {
      this.configService.setConfig({ isLoader: false });
      if (this.message?.isEdit) {
        this.dataService.nextMessage({ isEdit: false });
        this.router.navigate(['/design/sprint-final']);
      } else {
        this.designService.configureSprint({selectedActions: Array.from(this.selectedActions)});
        this.designService.configureSprint({selectedBehaviours: Array.from(this.selectedBehaviours)});
        this.designService.configureSprint({selectedOutcomes: Array.from(this.selectedOutcomes)});
        this.router.navigate(['/design/sprint-crew-role']);
      }
    }else{
      this._snackBar.open('Please Select at least one from each action, behavior and outcome', '', {
        duration: 3000,
      });
    }
  }

  public back() {
    this.designService.configureSprint({selectedActions: Array.from(this.selectedActions)});
    this.router.navigate(['/design/sprint-configure']);
  }
}
