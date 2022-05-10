
import { ConfigService } from './../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { environment } from '../../../../../src/environments/environment';
// import { DataService } from '../../service/data.service';
// import { FadDetailsComponent } from '../modals/fad-details/fad-details.component';
import { MatDialog } from '@angular/material/dialog';
// import { SharedDetailedReportComponent } from '../../../../src/app/shared/components/shared-detailed-report/shared--report.component';
import { SharedDetailedReportComponent } from '../../../../app/shared/components/shared-detailed-report/shared-detailed-report.component';
import { DataService } from 'src/app/design/service/data.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { DesignService } from '../design.service';
import { SharedDonutReportComponent } from 'src/app/shared/components/shared-donut-report/shared-donut-report.component';
import { SharedCycleReportComponent } from 'src/app/shared/components/shared-cycle-report/shared-cycle-report.component';
import { SharedAlignmentProfileComponent } from 'src/app/shared/components/shared-alignment-profile/shared-alignment-profile.component';

@Component({
  selector: 'app-teams-fad-priority',
  templateUrl: './teams-fad-priority.component.html',
  styleUrls: ['./teams-fad-priority.component.scss']
})
export class TeamsFadPriorityComponent implements OnInit {
  message: any = {};
  capabilities = [];

  selectedCapability = [];

  shownCapability: Set<number> = new Set([]);
  maxSelection = 3;
  isShowMore = false;
  isPriority = null;
  assessmentId: any;
  selectedFad: any;
  selectedDevelopment: any;
  capabilityData: any = [];
  roleData: any = [];
  alignData: any = [];
  isValue: string;
  focusTeamSprintArr: any[];
  teamId: string;
  description: any;
  priorityName: any;
  selectedPriority: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,
    private configService: ConfigService,
    public dialog: MatDialog,
    private designService: DesignService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.dataService.nextMessage({
      faddev: false,
      fadfocus: true,
      sprint: false,
      Capability: false,
      behaviour: false,
      outcome: false,
      crew: false,
      frequency: false,
      isConfirm: false,
      show: true,
      routine: false,
      action: false,
      step: 1,
    });
    this.getCapabilities();
    this.getRolesSurveyData();
  }

  setPriorityCap(id,data) {
    this.isPriority = data.index;
    this.selectedPriority = data.unique_id;
    this.priorityName = data.name;
    localStorage.setItem('priority_name',this.priorityName)
    this.isValue = `${data.type}=${id}`;
    this.dataService.nextMessage({ fadfocus: true });
  }

  getCapabilities() {
    this.configService.setConfig({ isLoader: true });
    this.designService.getFad().subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      res.capabilities.map(value => {
        value.type = 'capId',
        value.name = value.label
        if(value.isPriority){
          this.isPriority = value.index;
          this.isValue = `${value.type}=${value.id}`
        }
      });
      res.roles.map(value => {
      value.type = 'roleId'
      if(value.isPriority){
        this.isPriority = value.index
        this.isValue = `${value.type}=${value.id}`
      }
    });
      res.areas.map(value => {
        value.type = 'areaId',
        value.name = value.scale
        if(value.isPriority){
          this.isPriority = value.index
          this.isValue = `${value.type}=${value.id}`
        }
      });
      this.focusTeamSprintArr = [...res.capabilities, ...res.roles, ...res.areas];

      this.focusTeamSprintArr = this.focusTeamSprintArr.map((sprint,unique_id)=>{

        if(sprint?.isPriority) {
          this.selectedPriority = unique_id;
        }

        return {
          ...sprint,
          "unique_id": unique_id
        };
      })
      for(let i of this.focusTeamSprintArr){
        let index = this.focusTeamSprintArr.findIndex(data => data === i);
        i.index = index;
      }
    }, error => {
      this.configService.setConfig({ isLoader: false });
    })
  }

  updateFad() {
    if (!this.isValue) {
      return;
    }
    if (this.isValue) {
      this.configService.setConfig({ isLoader: true });
      this.designService.setFad(this.isValue).subscribe(
        (res: any) => {
          this.configService.setConfig({ isLoader: false });
          this.router.navigate(['teams/design/teams-sprint-configure'])
        },
        (err) => {
          this.configService.setConfig({ isLoader: false });
        }
      );
    }
  }

  showDescription(id: number) {
    if (this.shownCapability.has(id)) {
      this.shownCapability.delete(id);
    } else {
      this.shownCapability.add(id);
    }
  }

  expandAll() {
    this.shownCapability = new Set(this.selectedCapability.map((o) => o.id));
  }

  showMore() {
    this.isShowMore = !this.isShowMore;
  }
  getRolesSurveyData(){
    this.configService.setConfig({ isLoader: true });
    this.teamId = localStorage.getItem('selectedTeamId');
      this.designService.cycledescription(this.teamId).subscribe(res => {
        this.description = res['roleDescription'];
        this.configService.setConfig({ isLoader: false });
      })
  }
  openDetailsDialog(fad) {
    if(fad.type == 'capId'){
      const dialogRef = this.dialog.open(SharedDonutReportComponent, {
        width: '40vw',
        height: 'calc(100vh - 76px)',
        position: { right: '0', top: '76px' },
        data: {data:fad}
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
    if(fad.type == 'roleId'){
      let descriptionData = {
        des: this.description,
        type: fad.name
      }
      const dialogRef = this.dialog.open(SharedCycleReportComponent, {
        width: '40vw',
        height: 'calc(100vh - 76px)',
        position: { right: '0', top: '76px' },
        data: descriptionData
      });

      dialogRef.afterClosed().subscribe((result) => {});
    }
    if(fad.type == 'areaId'){
         const dialogRef = this.dialog.open(SharedAlignmentProfileComponent, {
           width: '40vw',
           height: 'calc(100vh - 76px)',
           position: { right: '0', top: '76px' },
           data: { data: fad, type: 'align' }
         });

         dialogRef.afterClosed().subscribe((result) => { });
       }
  }
}

