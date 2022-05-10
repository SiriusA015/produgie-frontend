import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RankService } from 'src/app/explore/service/rank.service';
import { SharedAlignmentProfileComponent } from 'src/app/shared/components/shared-alignment-profile/shared-alignment-profile.component';

@Component({
  selector: 'app-alignment-profile-structure',
  templateUrl: './alignment-profile-structure.component.html',
  styleUrls: ['./alignment-profile-structure.component.scss'],
})
export class AlignmentProfileStructureComponent implements OnInit, OnChanges {
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;
  @Input() filteredData: any;
  selectedCircluar: any = '';
  showPurpose = true;
  showProcess = true;
  showPeople = true;
  showStakeholder = true;
  purposeRank: any;
  processrank: any;
  peopleRank: any;
  stakeHoldersRank: any;
  showBadge: boolean = false;

  constructor(public dialog: MatDialog, public rankService: RankService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.filteredData) {
      this.applyFilters();

      // Rank Order Filter
      if (this.filteredData.rank == true) {
        this.showBadge = true;
        this.purposeRank = this.filteredData.find(
          (element) => element.scale == 'Purpose'
        )?.rank;
        this.showPurpose = true;
        this.processrank = this.filteredData.find(
          (element) => element.scale == 'Process'
        )?.rank;
        this.showProcess = true;
        this.peopleRank = this.filteredData.find(
          (element) => element.scale == 'People'
        )?.rank;
        this.showPeople = true;
        this.stakeHoldersRank = this.filteredData.find(
          (element) => element.scale == 'Perspective of Stakeholders'
        )?.rank;
        this.showStakeholder = true;
      }
    } else if (this.filteredData == undefined) {
      this.showPurpose = true;
      this.showProcess = true;
      this.showPeople = true;
      this.showStakeholder = true;
      this.showBadge = false;
    }
  }

  applyFilters() {
    this.showPurpose =
      this.filteredData.includes('Purpose') ||
      (Array.isArray(this.filteredData) &&
        this.filteredData?.find((str) => str == 'Purpose'))
        ? true
        : false;
    this.showProcess =
      this.filteredData.includes('Process') ||
      (Array.isArray(this.filteredData) &&
        this.filteredData?.find((str) => str == 'Process'))
        ? true
        : false;
    this.showPeople =
      this.filteredData.includes('People') ||
      (Array.isArray(this.filteredData) &&
        this.filteredData?.find((str) => str == 'People'))
        ? true
        : false;
    this.showStakeholder =
      this.filteredData.includes('Perspective of Stakeholders') ||
      (Array.isArray(this.filteredData) &&
        this.filteredData?.find((str) => str == 'Perspective of Stakeholders'))
        ? true
        : false;
  }

  ngAfterViewInit() {
    if (this.wrapper.nativeElement.offsetWidth > 0) {
      this.wrapper.nativeElement.style.height =
        this.wrapper.nativeElement.offsetWidth + 'px';
    }
  }

  onResize() {
    if (this.wrapper.nativeElement.offsetWidth > 0) {
      this.wrapper.nativeElement.style.height =
        this.wrapper.nativeElement.offsetWidth + 'px';
    }
  }

  openDetailsDialog(name) {
    const dialogRef = this.dialog.open(SharedAlignmentProfileComponent, {
      width: '635px',
      height: '383px',
      position: { top: '76px' },
      data: { data: name, type: 'alignment-profile' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.selectedCircluar = ' ';
    });
  }
}
