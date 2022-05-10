import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { RankService } from '../../../explore/service/rank.service';
import { ExploreService } from '../explore.service';
import { DetailReportTeamProfileComponent } from './detail-report-team-profile/detail-report-team-profile.component';

@Component({
  selector: 'app-team-alignment-profile',
  templateUrl: './team-alignment-profile.component.html',
  styleUrls: ['./team-alignment-profile.component.scss']
})
export class TeamAlignmentProfileComponent implements OnInit {

  isHighest: boolean = false;
  isLowest: boolean = false;
  isRecommended: boolean = false;
  isRankOrder: boolean = false;
  reportGenerated = false;
  triggerData: any;
  filteredData: any;
  highestRank: any;
  lowestRank: any;
  isCircle = true;
  isBox = false;
  updateFilteredData: any;
  isLoading: boolean = false;
  infoMsg: string;
  isErrorInReport: Boolean = false;

  constructor(
    public rankService: RankService,
    private matDialog: MatDialog,
    private exploreService: ExploreService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.exploreService.getFilteredData().subscribe((data: any) => {
      this.filteredData = data;
      this.isErrorInReport = false;
      if(data){
        this.isLoading = false;
      }
    }, (err) => {
      this.isLoading = false;
      this.isErrorInReport = true;
      this.infoMsg = err?.error?.errorMessage;

      /* if (err.error.statusCode == 404) {
        this.toastr.warning('Warning', err.error.errorMessage, {
          timeOut: 3000,
        });
      } else {
        this.toastr.error('Error', err.error.errorMessage, {
          timeOut: 3000,
        });
      } */
    });
  }

  changeHighest() {
    this.updateFilteredData = this.filteredData.highest_scale;
    this.isHighest = !this.isHighest;
    this.isLowest = false;
    this.isRecommended = false;
    // this.isRankOrder = false;
    if (this.isHighest == false) {
      this.updateFilteredData = undefined;
    }
  }

  changeLowest() {
    this.updateFilteredData = this.filteredData.lowest_scale;
    this.isLowest = !this.isLowest;
    this.isHighest = false;
    this.isRecommended = false;
    // this.isRankOrder = false;
    if (this.isLowest == false) {
      this.updateFilteredData = undefined;
    }
  }

  changeRecommendCheck() {
    this.updateFilteredData = this.filteredData.recommended_scale;
    this.isRecommended = !this.isRecommended;
    this.isHighest = false;
    this.isLowest = false;
    // this.isRankOrder = false;
    if (this.isRecommended == false) {
      this.updateFilteredData = undefined;
    }
  }

  changeRankCheck() {
    this.updateFilteredData = this.filteredData.rankOrders;
    this.isRankOrder = !this.isRankOrder;
    this.updateFilteredData['rank'] = this.isRankOrder;
    this.isHighest = false;
    this.isLowest = false;
    this.isRecommended = false;
    if (this.isRankOrder == false) {
      this.updateFilteredData = undefined;
    }
  }

  clearFilters() {
    this.isRecommended = false;
    this.isHighest = false;
    this.isLowest = false;
    this.isRankOrder = false;
  }


  openTeamAlignReport() {
    const dialogRef = this.matDialog.open(DetailReportTeamProfileComponent, {
      width: '100%',
      maxWidth: '100%',
      height: '100%',
      maxHeight: '100%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
