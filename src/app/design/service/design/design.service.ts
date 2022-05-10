import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { DataService } from '../data.service';
import { forkJoin, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DesignService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  public currentState: any = undefined;
  private localUrl = false;

  public getCurentUrlParam() {
    this.route.queryParams.pipe(take(1)).subscribe((params: Params) => {
      if (this.currentState && this.localUrl) {
        this.updateUrl();
      } else if (this.currentState === undefined && params?.sprint && this.isUrlValidContent(params.sprint)) {
        this.currentState = JSON.parse(atob(params.sprint));
        this.localUrl = true;
        
        if (this.currentState.selectedCapability) {
          this.getStarted(this.currentState.selectedCapability);
        }
      } else {
        forkJoin([
          this.getSelectedFad(),
          this.getSprint(),
          this.getSelectedActions(),
          this.getSelectedBehaviours(),
          this.getSelectedOutcomes()
        ]).subscribe(([fad, sprint, actions, behaviors, outcomes]: any) => {
          this.configureSprint({ selectedCapability : fad?.data?.map(item => item.capabilityId) });
          this.configureSprint({ priority : fad?.data?.find(item => item.isPriority)?.capabilityId });

          this.configureSprint({ sprintId : sprint?.data?.userSprint?.sprintId, schedule: sprint?.data?.userSprint?.duration });

          this.configureSprint({ selectedActions : actions?.data?.filter(action => action.actionId).map(action => action.actionId) });
          this.configureSprint({ selectedBehaviors : behaviors?.data?.filter(behaviour => behaviour.behaviourId).map(behaviour => behaviour.behaviourId) });
          this.configureSprint({ selectedOutcomes : outcomes?.data?.filter(outcome => outcome.outcomeId).map(outcome => outcome.outcomeId) });

          this.dataService.nextMessage({sprintLoadedFromUrl: false});
          this.updateUrl();
        });
      }
    });
  }

  public isUrlValidContent(url: string) {
    try {
      JSON.parse(atob(url));
    } catch(e) {
      return false;
    }

    return true;
  }

  public configureSprint(item: any) {
    const oldState = JSON.stringify(this.currentState);
    this.currentState =  { ...this.currentState, ...item };

    const newState = JSON.stringify(this.currentState);
    if (oldState !== newState) {
      this.dataService.nextMessage({sprintLoadedFromUrl: false});
    }
  }

  public updateUrl() {
    if (this.currentState) {
      this.router.navigate(
        [], 
        {
          relativeTo: this.route,
          queryParams: { sprint: btoa(JSON.stringify(this.currentState)) }, 
          queryParamsHandling: 'merge'
        }
      );
    }
  }

  public navigate(route: string) {
    this.router.navigate(
      [route], 
      {
        relativeTo: this.route,
        queryParams: { sprint: btoa(JSON.stringify(this.currentState)) }, 
        queryParamsHandling: 'merge'
      }
    );
  }

  public getStarted(selectedCapability: any) {
    this.http.get(`${environment.baseurl}/glaassessment/get-started`)
      .pipe(take(1))
      .subscribe(() => {
        this.storeFad(selectedCapability);
      }
    );
  }

  public storeFad(selectedCapability: any) {
    this.http.post(`${environment.baseurl}/selectedfad/add-fad`, { capabilityId: selectedCapability })
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.status === 200) {
          if (this.currentState.priority) {
            this.selectFadPriority(this.currentState.priority);
          }
        } 
      }
    );
  }

  public selectFadPriority(priority: any) {
    this.http.patch(`${environment.baseurl}/selectedfad/update-fad`, { fadId: priority })
      .pipe(take(1))
      .subscribe((res: any) => {
        if (res.status === 200) {
          if (this.currentState.sprintId && this.currentState.schedule) {
            this.addSprintItem({ sprintId: this.currentState.sprintId, duration: this.currentState.schedule });
          }
        }
      }
    );
  }

  public addSprintItem(payload: any) {
    this.http.post(`${environment.baseurl}/selectedsprintfad/add-sprintfad`, payload)
      .subscribe((res: any) => {
        this.prepareSprintItems();
      }
    );
  }

  public prepareSprintItems() {
    forkJoin([
      this.getSelectedActions(),
      this.getSelectedBehaviours(),
      this.getSelectedOutcomes()
    ])
    .pipe(take(1))
    .subscribe(([actions, behaviors, outcomes]: any[]) => {
      const actionsCurrent = actions.data.filter(action => action.actionId).map(action => action.actionId);
      const behaviorsCurrent = behaviors.data.filter(behaviour => behaviour.behaviourId).map(behaviour => behaviour.behaviourId);
      const outcomesCurrent = outcomes.data.filter(outcome => outcome.outcomeId).map(outcome => outcome.outcomeId);

      const actionsRemoved = actionsCurrent.filter(newAction => !this.currentState.selectedActions.includes(newAction));
      const behaviorsRemoved = behaviorsCurrent.filter(newbehavior => !this.currentState.selectedBehaviours.includes(newbehavior));
      const outcomesRemoved = outcomesCurrent.filter(newoutcome => !this.currentState.selectedOutcomes.includes(newoutcome));

      const actionsAdded = this.currentState.selectedActions.filter(newaction => !actionsCurrent.includes(newaction));
      const behaviorsAdded = this.currentState.selectedBehaviours.filter(newbehavior => !behaviorsCurrent.includes(newbehavior));
      const outcomesAdded = this.currentState.selectedOutcomes.filter(newoutcome => !outcomesCurrent.includes(newoutcome));

      const removedItems = actionsRemoved.map(actionId => this.deleteActionItems(actionId))
      .concat(behaviorsRemoved.map(behaviourId => this.deleteBehaviourItems(behaviourId)))
      .concat(outcomesRemoved.map(outcomeId => this.deleteOutcomeItems(outcomeId)));

      const addedItems = actionsAdded.map(actionId => this.addActionItems({ actionId: actionId, isCustom: false }))
      .concat(behaviorsAdded.map(behaviourId => this.addBehaviourItems({ behaviourId: behaviourId, isCustom: false })))
      .concat(outcomesAdded.map(outcomeId => this.addOutcomeItems({ outcomeId: outcomeId, isCustom: false })));

      if (removedItems.length > 0) {
        forkJoin(removedItems)
        .subscribe(() => {
          this.addItems(addedItems);
        });
      } else {
        this.addItems(addedItems);
      }
      
    });
  }

  public addItems(addedItems: any) {
    forkJoin(addedItems)
    .pipe(take(1))
    .subscribe(() => {
      this.dataService.nextMessage({isUrlLoaded: true});
    });
  }

  private getSelectedFad() {
    return this.http.get(`${environment.baseurl}/selectedfad/get-selected-fad`);
  }

  private getSprint() {
    return this.http.get(`${environment.baseurl}/sprint/all`);
  }

  public getSelectedActions() {
    return this.http.get(`${environment.baseurl}/selectedaction/get-sel`);
  }

  public getSelectedBehaviours() {
    return this.http.get(`${environment.baseurl}/selectedbehaviour/get-sel`);
  }

  public getSelectedOutcomes() {
    return this.http.get(`${environment.baseurl}/selectedoutcome/get-sel`);
  }

  public addActionItems(payload: any): Observable<any> {
    return this.http.post(`${environment.baseurl}/selectedaction/add-sel`, payload);
  }

  public deleteActionItems(id: number): Observable<any> {
    return this.http.delete(`${environment.baseurl}/selectedaction/${id}`);
  }

  public addBehaviourItems(payload: any): Observable<any> {
    return this.http.post(`${environment.baseurl}/selectedbehaviour/add-sel`, payload);
  }

  public deleteBehaviourItems(id: number): Observable<any> {
    return this.http.delete(`${environment.baseurl}/selectedbehaviour/${id}`);
  }

  public addOutcomeItems(payload: any): Observable<any> {
    return this.http.post(`${environment.baseurl}/selectedoutcome/add-sel`, payload);
  }

  public deleteOutcomeItems(id: number): Observable<any> {
    return this.http.delete(`${environment.baseurl}/selectedoutcome/${id}`);
  }
}
