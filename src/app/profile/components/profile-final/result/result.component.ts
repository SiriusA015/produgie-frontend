import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { DataService } from 'src/app/design/service/data.service';
import { WarningModalComponent } from '../modals/warning-modal/warning-modal.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { uniqueDates } from 'igniteui-angular/lib/core/utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit, OnChanges {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.Medium])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  message: any;
  isOpen = false;
  @Input() advice: any[] = [];
  @Input() feedback: any[] = [];
  tempAdvice: any[] =[];
  tempFeedback: any[] =[];

  resultsSelect: any[] =
    [{key: "action", value: "Actions"},
     {key: "behaviours", value: "Behaviours"},
     {key: "outcome", value: "Outcome"},
     {key: "reflection", value: "Reflection"},
     {key: "engagement", value:"Sprint Crew Engagement"}]

  selectedValue: string = 'engagement';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router
   ) { }

  ngOnInit(): void {

  }

  ngOnChanges() {
    setTimeout(() => {

      this.tempAdvice = this.advice
      this.tempAdvice.map(item =>{
        if (item.imageUrl == undefined) {
          item.avatar = `/assets/avatars/${item.avatar}.svg`;
        } else {
          item.avatar = environment.baseurl + item.imageUrl;
        }
      })
    }, 1000);
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

  getSelectResult(value: string) {
    this.selectedValue =  value;
  }
}
