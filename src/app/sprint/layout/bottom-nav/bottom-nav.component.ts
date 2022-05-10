import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss']
})
export class BottomNavComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe([Breakpoints.Handset, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Web])
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );

constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

}
