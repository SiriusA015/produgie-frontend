import { SaveModalComponent } from './../../design-final/modals/save-modal/save-modal.component';
import { DataService } from './../../../service/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { WarningModalComponent } from './../modals/warning-modal/warning-modal.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class DesignSummaryComponent implements OnInit {
  isEdit = true;
  @Input() userSprint: any;
  @Input() design;
  @Input() name;
  @Input() advicecomp;
  data:any;
  constructor(private router: Router, private dataService: DataService, public dialog: MatDialog,) { }
  ngOnInit(): void {
  }

  finalEdit() {
    this.isEdit = false;
    this.router.navigateByUrl('/design/fad');
    this.dataService.nextMessage({
      isEdit: true, 
      isSprint: false,
      isResetDesignEdit: false,
      isEditState: true
    });

    // const dialogRef = this.dialog.open(WarningModalComponent, {
    //   width: '35vw',
    //   data: {}
    // });
  }

  saveSprint() {
    this.isEdit = true;
    this.dataService.nextMessage({isEdit: false});
  }

  shareSprint() {
    const dialogRef = this.dialog.open(SaveModalComponent, {
      width: '25vw',
      data: {}
    });
  }

  editCrew() {
    this.router.navigateByUrl('/design/sprint-crew-role');
    this.dataService.nextMessage({isEdit: true, isResetDesignEdit: false});
  }
}
