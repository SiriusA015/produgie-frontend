import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DataService } from 'src/app/design/service/data.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WarningModalComponent } from 'src/app/design/components/design-final/modals/warning-modal/warning-modal.component';
import { DesignService } from '../../design.service';
import { TeamWarningComponent } from '../../Modal/team-warning/team-warning.component';
import { ConfigService } from 'src/app/shared/service/config.service';


@Component({
  selector: 'app-strength-and-priorities',
  templateUrl: './strength-and-priorities.component.html',
  styleUrls: ['./strength-and-priorities.component.scss']
})
export class StrengthAndPrioritiesComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.Medium])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  message: any;
  isOpen = false;
  @Input() fads: any[] = [];

  @Input() strenghts: any[] = [];
  @Input() priority;
  @Input() feedbackpage;
  @Input() finalFeedbackpage;
 
  isValue: string;
  focusTeamSprintArr: any[];

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private dataService: DataService,
    private designService: DesignService,
    private configService: ConfigService,
   
  ) { }

  ngOnInit(): void {
    this.dataService.sharedMessage.subscribe(message => this.message = message);
  }
  openWarningModal() {
    const dialogRef = this.dialog.open(TeamWarningComponent, {
      width: '35vw',
      data: {}
    });
  }

}

