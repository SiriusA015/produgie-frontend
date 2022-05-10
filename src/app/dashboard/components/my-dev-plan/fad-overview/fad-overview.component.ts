import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
@Component({
  selector: 'app-md-fad-overview',
  templateUrl: './fad-overview.component.html',
  styleUrls: ['./fad-overview.component.scss']
})
export class MDFadOverviewComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.Medium])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );
  message: any;
  isOpen = false;
  @Input() strenghts: any[] = [];
  @Input() fads: any[] = [];
  @Input() priority;
  constructor(
    private breakpointObserver: BreakpointObserver
   ) { }

  ngOnInit(): void {
  }

}
