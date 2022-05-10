import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-team-bottom-nav',
  templateUrl: './team-bottom-nav.component.html',
  styleUrls: ['./team-bottom-nav.component.scss']
})
export class TeamBottomNavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.Medium])
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

}
