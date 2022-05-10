import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, RoutesRecognized } from '@angular/router';
import { BlankUiLayoutComponent } from 'src/app/ui/layout/blank-ui-layout/blank-ui-layout.component';
import { filter, pairwise } from 'rxjs/operators';
import { ConfigService } from 'src/app/shared/service/config.service';
@Component({
  selector: 'app-designstatus-confirmation',
  templateUrl: './designstatus-confirmation.component.html',
  styleUrls: ['./designstatus-confirmation.component.scss']
})
export class DesignstatusConfirmationComponent implements OnInit {

  // redirect: any;

  constructor(
    public dialogRef: MatDialogRef<BlankUiLayoutComponent>,
    private router: Router,
    private configService: ConfigService,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.router.events
    .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
    .subscribe((events: RoutesRecognized[]) => {
    //  this.redirect = events[0].urlAfterRedirects
    });
  }

  onNoClick(): void {
    // this.dialogRef.disableClose = true;
    // this.dialogRef.close();
    // this.router.navigate(['this.redirect']);
    // this.router.navigate(['/explore/aboutme']);
    location.href = `${location.origin}/explore/aboutme`;
    this.configService.setConfig({ isLoader: false });    
  }
}
