
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, OnChanges, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RankService } from 'src/app/explore/service/rank.service';
import { SharedDetailedReportComponent } from 'src/app/shared/components/shared-detailed-report/shared-detailed-report.component';
import { SharedDonutReportComponent } from 'src/app/shared/components/shared-donut-report/shared-donut-report.component';
import { TeamService } from 'src/app/teams/team.service';
@Component({
  selector: 'app-donut-box',
  templateUrl: './donut-box.component.html',
  styleUrls: ['./donut-box.component.scss']
})
export class DonutBoxComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() rankChecked;
  @Input() capabilities;
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;
  ratio = 1;
  capData = [];
  
  data = [
    {
      style: 1,
      strategy: 4,
      rank: 9,
      count: 0,
      index: 0,
      expand: false,
      title: 'Structure & Execute Growth Plan',
      icon: 'cap_1'
    },
    {
      style: 5,
      strategy: 1,
      rank: 1,
      count: 0,
      index: 0,
      expand: false,
      title: 'Manage Complexity',
      icon: 'cap_2'
    },
    {
      style: 1,
      strategy: 4,
      rank: 2,
      count: 0,
      index: 0,
      expand: false,
      title: 'Build Resilience',
      icon: 'cap_3'
    },
    {
      style: 1,
      strategy: 4,
      rank: 3,
      count: 0,
      index: 0,
      expand: false,
      title: 'Set Vision And Inspire Action',
      icon: 'cap_4'
    },
    {
      style: 1,
      strategy: 4,
      rank: 4,
      count: 0,
      index: 0,
      expand: false,
      title: 'Develop & Empower Talent',
      icon: 'cap_5'
    },
    {
      style: 5,
      strategy: 2,
      rank: 5,
      count: 0,
      index: 0,
      expand: false,
      title: 'Build Stakeholder Relationship',
      icon: 'cap_6'
    },
    {
      style: 5,
      strategy: 1,
      rank: 6,
      count: 0,
      index: 0,
      expand: false,
      title: 'Structure & Execute Growth Plan',
      icon: 'cap_7'
    },
    {
      style: 5,
      strategy: 5,
      rank: 7,
      count: 0,
      index: 0,
      expand: false,
      title: 'Develop Growth Mindset',
      icon: 'cap_8'
    },
    {
      style: 2,
      strategy: 3,
      rank: 8,
      count: 0,
      index: 0,
      expand: false,
      title: 'Lead Innovation',
      icon: 'cap_9'
    },
  ];
  index = 0;
  matrix = [
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []],
    [[], [], [], [], []]
  ];
  isExpand = { style: -1, strategy: -1 };
  filteredData = [];
  message: any;
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
    this.capData = this.capabilities.map(o => {
      return {
        capability: o.capabilityType,
        title: o.label,
        icon: o.icon,
        style: o.style === 0 ? 1 : o.style,
        strategy: o.strategy === 0 ? 1 : o.strategy,
        rank: o.rank,
        average_Score: o.average_Score,
        count: 0,
        index: 0,
        expand: false,
        capabilityName: o.capabilityName
      };
    });
    this.transforData(this.capData);
    
    
  }
  ngOnChanges() {

    this.capData = this.capabilities.map(o => {
      return {
        capability: o.capability,
        title: o.label,
        icon: o.icon,
        style: o.style === 0 ? 1 : o.style,
        strategy: o.strategy === 0 ? 1 : o.strategy,
        rank: o.rank,
        average_Score: o.average_Score,
        count: 0,
        index: 0,
        expand: false,
        capabilityName: o.capabilityName
      };
    });
    this.transforData(this.capData);
  }
  ngAfterViewInit() {
    if (this.wrapper.nativeElement.offsetWidth > 0) {
      this.wrapper.nativeElement.style.height = (this.wrapper.nativeElement.offsetWidth) * this.ratio + 'px';
    }
  }
  onResize() {
    if (this.wrapper.nativeElement.offsetWidth > 0) {
      this.wrapper.nativeElement.style.height = (this.wrapper.nativeElement.offsetWidth) * this.ratio + 'px';
    }
  }
  transforData(data: any[]) {
    const tmp = data;
    this.matrix = [
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []]
    ];
    this.filteredData = data.map((o, i) => {
      tmp[i].index = i;
      tmp[i].count = this.matrix[(o.style - 1)][(o.strategy - 1)].length; // storing - 1

      this.matrix[(o.style - 1)][(o.strategy - 1)].push(tmp[i]);

      this.index = i;
      const count = this.matrix[(o.style - 1)][(o.strategy - 1)].length;
      return {
        ...tmp[i],
        count
      };
    });
  }
  capabilityClicked(data) {

    /* if (this.isExpand.style !== -1 && this.isExpand.strategy !== -1) {
    } else {
      if (this.matrix[(data.style - 1)][(data.strategy - 1)].length > 1) {
        this.matrix[(data.style - 1)][(data.strategy - 1)].forEach((o, i) => {
          this.filteredData[o.index].expand = !this.filteredData[o.index].expand;
        });
        this.isExpand = { style: data.style, strategy: data.strategy };
      } else {
      }
    } */

    if (this.isExpand.style !== -1 && this.isExpand.strategy !== -1) {
      this.openDetailsDialog(data.capabilityName);
    } else {
      if (this.matrix[(data.style - 1)][(data.strategy - 1)].length > 1) {
        this.matrix[(data.style - 1)][(data.strategy - 1)].forEach((o, i) => {
          this.filteredData[o.index].expand = !this.filteredData[o.index].expand;
        });
        this.isExpand = {style: data.style, strategy: data.strategy};
      } else {
        this.openDetailsDialog(data.capabilityName);
      }
    }

  }
  overlayToggle() {
    if (this.isExpand.style !== -1 && this.isExpand.strategy !== -1) {
      if (this.matrix[(this.isExpand.style - 1)][(this.isExpand.strategy - 1)].length > 1) {
        this.matrix[(this.isExpand.style - 1)][(this.isExpand.strategy - 1)].forEach((o, i) => {
          this.filteredData[o.index].expand = !this.filteredData[o.index].expand;
        });
      }
    }
    this.isExpand = { style: -1, strategy: -1 };
  }

  openDetailsDialog(cap) {
    const dialogRef = this.dialog.open(SharedDonutReportComponent, {
      width: '40vw',
      height: 'calc(100vh - 76px)',
      position: { top: '76px' },
      data: {data:cap,type:'donought'},
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

