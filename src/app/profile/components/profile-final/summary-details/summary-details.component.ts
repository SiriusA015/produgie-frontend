import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DataService } from 'src/app/design/service/data.service';
import { WarningModalComponent } from './../modals/warning-modal/warning-modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.scss']
})
export class DesignSummaryDetailsComponent implements OnInit {
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

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router
   ) { }

  ngOnInit(): void {
    console.log('color' , this.fads)
    console.log('strenghts' , this.strenghts);
    console.log('feedback' , this.feedbackpage);
    
    this.dataService.sharedMessage.subscribe(message => this.message = message);
    console.log(this.feedbackpage,"val", this.message)
  }
  openWarningModal() {
    // const dialogRef = this.dialog.open(WarningModalComponent, {
    //   width: '35vw',
    //   data: {}
    // });
    this.dataService.nextMessage({
      isEdit: false,
      isResetDesignEdit: true,
    });
    this.router.navigate(['/design/fad']);
  }
}
