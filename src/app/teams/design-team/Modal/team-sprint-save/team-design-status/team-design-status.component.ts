import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/shared/service/config.service';
import { HeaderComponent } from 'src/app/ui/layout/header/header.component';

@Component({
  selector: 'app-team-design-status',
  templateUrl: './team-design-status.component.html',
  styleUrls: ['./team-design-status.component.scss']
})
export class TeamDesignStatusComponent implements OnInit {
  redirect: any;

  constructor(
    public dialogRef: MatDialogRef<HeaderComponent>,
    private router: Router,
    private configService: ConfigService,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    // this.router.events
    // .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    // .subscribe((events: RoutesRecognized[]) => {
    //   console.log('previous url', events[0].urlAfterRedirects);
    //  this.redirect = events[0].urlAfterRedirects
    // });
  }

  onNoClick(): void {
    this.router.navigate(['teams/explore/team-portal']);
    this.dialogRef.disableClose = true;
    this.dialogRef.close();
  }

}


