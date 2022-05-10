import { SaveModalComponent } from './../../profile-final/modals/save-modal/save-modal.component';
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

  closeProfileDetail() {
    this.router.navigateByUrl('/profile/my-history');
  }
}
