import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';


@Component({
  selector: 'app-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.scss']
})
export class SummaryDetailsComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.Medium])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  isOpen = false;
  constructor(
    private breakpointObserver: BreakpointObserver
   ) { }

  ngOnInit(): void {
  }

}
