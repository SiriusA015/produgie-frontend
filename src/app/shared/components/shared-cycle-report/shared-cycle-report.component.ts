import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from 'src/app/teams/team.service';

@Component({
  selector: 'app-shared-cycle-report',
  templateUrl: './shared-cycle-report.component.html',
  styleUrls: ['./shared-cycle-report.component.scss']
})
export class SharedCycleReportComponent implements OnInit {
  description: any;
  filterdata: any;
  performance: any;
  performanceW: any;
  loadCounter = 0;
  team_id: string;

  constructor(
    public dialogRef: MatDialogRef<SharedCycleReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    console.log(this.data, "this.data");
    this.filterdescription()
}

  filterdescription() {
    this.filterdata = this.data.des.filter(ele => ele.team_role == this.data.type);
    this.performance = this.filterdata.filter(p => p.performance == 'Best');
    this.performanceW = this.filterdata.filter(p => p.performance == 'Worst');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
