import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { HelipopperDirective } from '@ngneat/helipopper';
import { sortLinear } from '@swimlane/ngx-charts';
import _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/design/service/data.service';
import { SharedAlignmentProfileComponent } from 'src/app/shared/components/shared-alignment-profile/shared-alignment-profile.component';
import { SharedCycleReportComponent } from 'src/app/shared/components/shared-cycle-report/shared-cycle-report.component';
import { SharedDetailedReportComponent } from 'src/app/shared/components/shared-detailed-report/shared-detailed-report.component';
import { SharedDonutReportComponent } from 'src/app/shared/components/shared-donut-report/shared-donut-report.component';
import { ConfigService } from 'src/app/shared/service/config.service';
import { environment } from 'src/environments/environment';
import { DesignService } from '../design.service';
const baseUrl = environment.baseurl;
@Component({
  selector: 'app-teams-fad',
  templateUrl: './teams-fad.component.html',
  styleUrls: ['./teams-fad.component.scss']
})
export class TeamsFadComponent implements OnInit {

  @ViewChild('tooltip') tooltip: HelipopperDirective;
  message: any = {};
  capabilities = [];
  recommendedFad = [];
  nonrecommendedFad = [];

  selectedCapability: Set<number> = new Set([]);
  selectedRoles: Set<number> = new Set([]);
  selectedAlignment: Set<number> = new Set([]);
  selectedCapabilityIndex: Set<number> = new Set([]);
  selectedRolesIndex: Set<number> = new Set([]);
  selectedAlignmentIndex: Set<number> = new Set([]);
  shownCapabilityRecommended: Set<number> = new Set([]);
  shownCapabilityNonRecommended: Set<number> = new Set([]);

  maxSelection = 3;
  isShowMore = false;
  selected: any[] = [];
  assessmentId: any;
  allcapabilities: any;
  show: boolean = false;
  roles = [];
  roleOthers = [];
  toggleRole: boolean = false;
  toggleAlignment: boolean = false;
  alignments: any;
  alignmentsOthers;
  selectedValue = [];
  modifiedArray: any[];
  capId: any[];
  teamId: string;
  description: any;
  capabilitiesData: any=[];
  showData: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dataService: DataService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private configService: ConfigService,
    private designService: DesignService
  ) {
    this.shownCapabilityRecommended = new Set(
      this.recommendedFad.map((o) => o.capability.id)
    );
  }

  ngOnInit(): void {
    this.dataService.nextMessage({
      faddev: true,
      fadfocus: false,
      sprint: false,
      Capability: false,
      behaviour: false,
      outcome: false,
      crew: false,
      frequency: false,
      isConfirm: false,
      step: 1,
      show: true,
      routine: false,
      action: false,
    });
    this.getCapabilitiesData();
    this.getRolesSurveyData();
    this.getRolesData();
    this.getAlignmentData();
  }

  getCapabilitiesData() {
    this.configService.setConfig({ isLoader: true });
    this.designService.getCapabilities().subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.capabilitiesData = res.filter(data=>data.recommended == true);
      this.capabilities=res.filter(data=>data.recommended == false);;
      this.showData = false;
      
      this.capabilities.map(data => {
        data.unique_key = data.id + '-cap'
      });
      this.capabilitiesData.map(data => {
        data.unique_key = data.id + '-cap'
      });
   
      // this.getRolesData();

    }, error => {
      this.configService.setConfig({ isLoader: false });
    })
  }
  getRolesData() {
    this.configService.setConfig({ isLoader: true });
    this.designService.getRoles().subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      
      res.map(data => {
        data.unique_key = data.id + '-role'
      });

      this.roles = res.filter(role=>role.recommended);
      this.roleOthers = res.filter(role=>!role.recommended);
      
      if(this.roles.length <= 0) this.toggleRole = true;
    }, error => {
      this.configService.setConfig({ isLoader: false });
    })
  }
  getAlignmentData() {
    this.configService.setConfig({ isLoader: true });
    this.designService.getAlignmentArea().subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      
      res.map(data => {
        data.unique_key = data.id + '-align'
      });
      
      this.alignments = res.filter(alignment=>alignment.recommended);
      this.alignmentsOthers = res.filter(alignment=>!alignment.recommended);

      if(this.alignments.length <= 0) this.toggleAlignment = true;
    }, error => {
      this.configService.setConfig({ isLoader: false });
    })
  }

  showTooltip() {
    if (this.selectedCapability?.size < 3) {
      this.tooltip.show();
    } else {
      this.tooltip.hide();
    }
  }


  selectedData(id, index, key) {
    let isMatch = this.selectedValue.filter(data => data.key === key);
    if (isMatch.length > 0) {
      var i = this.selectedValue.length;
      while (i--) {
        if (this.selectedValue[i]
          && this.selectedValue[i].hasOwnProperty('key')
          && (arguments.length > 2 && this.selectedValue[i]['key'] === key)) {

          this.selectedValue.splice(i, 1);
        }
      }
    }
    else {
      if (this.selectedValue.length < 3) {
        this.selectedValue.push({ id: id, key: key });
      }
      else {
        this.dataService.nextMessage({ faddev: true });
      }
    }
    let result = this.selectedValue.map(a => a.key);
    this.modifiedArray = Object.assign(result);
  }

  showDescriptionRecommended(id: number) {
    if (this.shownCapabilityRecommended.has(id)) {
      this.shownCapabilityRecommended.delete(id);
    } else {
      this.shownCapabilityRecommended.add(id);
    }
  }

  showDescriptionNonRecommended(id: number) {
    if (this.shownCapabilityNonRecommended.has(id)) {
      this.shownCapabilityNonRecommended.delete(id);
    } else {
      this.shownCapabilityNonRecommended.add(id);
    }
  }

  expandAllRecommended() {
    this.shownCapabilityRecommended = new Set(
      this.recommendedFad.map((o) => o.capability.id)
    );
  }
  expandAllnonRecommended() {
    if (
      this.shownCapabilityNonRecommended.size === this.nonrecommendedFad.length
    ) {
      this.shownCapabilityNonRecommended.clear();
    } else {
      this.shownCapabilityNonRecommended = new Set(
        this.nonrecommendedFad.map((o) => o.capability.id)
      );
    }
  }

  showMore() {
    this.isShowMore = !this.isShowMore;
  }

  storeFad() {
    if (this.selectedValue.length < 3) {
      return;
    }
    this.configService.setConfig({ isLoader: true });
    this.selectedValue.forEach(data => {
      data.key = data.key.split("-")[1];
    })

    let cap = []
    let role = []
    let align = []

    for (let i of this.selectedValue) {
      if (i.key === "cap") {
        cap.push(i.id);
      }
      if (i.key === "role") {
        role.push(i.id);
      }
      if (i.key === "align") {
        align.push(i.id);
      }
    }    
    this.designService.addPriority(cap.join(), role.join(), align.join()).subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.dataService.nextMessage({ isResetDesignEdit: true });
      this.router.navigate(['/teams/design/teams-fad-priority']);
    }, error => {
      this.configService.setConfig({ isLoader: false });
    })
  }
  getRolesSurveyData() {
    this.configService.setConfig({ isLoader: true });
    this.teamId = localStorage.getItem('selectedTeamId');
    this.designService.cycledescription(this.teamId).subscribe(res => {
      this.description = res['roleDescription'];
      this.configService.setConfig({ isLoader: false });
    })


  }
  openDetailsDialog(fad) {
    if (fad.unique_key.includes('-cap')) {
      const dialogRef = this.dialog.open(SharedDonutReportComponent, {
        width: '40vw',
        height: 'calc(100vh - 76px)',
        position: { right: '0', top: '76px' },
        data: { data: fad, type: 'cap' }
      });

      dialogRef.afterClosed().subscribe((result) => { });
    }
    if (fad.unique_key.includes('-role')) {
      let descriptionData = {
        des: this.description,
        type: fad.roleName
      }
      const dialogRef = this.dialog.open(SharedCycleReportComponent, {
        width: '40vw',
        height: 'calc(100vh - 76px)',
        position: { right: '0', top: '76px' },
        data: descriptionData
      });

      dialogRef.afterClosed().subscribe((result) => { });
    }
    if (fad.unique_key.includes('-align')) {
      const dialogRef = this.dialog.open(SharedAlignmentProfileComponent, {
        width: '40vw',
        height: 'calc(100vh - 76px)',
        position: { right: '0', top: '76px' },
        data: { data: fad, type: 'align' }
      });

      dialogRef.afterClosed().subscribe((result) => { });
    }

  }
  showMoreData(){
    this.showData= !this.showData;
  }
  showLessData(){
    this.showData= !this.showData;
  }

  toggleRoles() {
    this.toggleRole = !this.toggleRole;
  }

  toggleAlignments() {
    this.toggleAlignment = !this.toggleAlignment;
  }
}

