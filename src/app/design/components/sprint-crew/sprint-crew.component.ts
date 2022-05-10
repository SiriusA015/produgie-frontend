import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SprintCrewAddDialogComponent } from './modals/sprint-crew-add-dialog/sprint-crew-add-dialog.component';
@Component({
  selector: 'app-sprint-crew',
  templateUrl: './sprint-crew.component.html',
  styleUrls: ['./sprint-crew.component.scss']
})
export class SprintCrewComponent implements OnInit {

  crews = [
    {
      name: 'Jade',
      role: 'Self',
      avatar: '/assets/icons/user-1.svg'
    },
    {
      name: 'Lucy',
      role: 'Manager',
      avatar: '/assets/icons/user-2.svg'
    },
    {
      name: 'Yuta',
      role: 'Mentor',
    },
    {
      name: 'Eilliam',
      role: 'Coach',
      avatar: '/assets/icons/user-1.svg'
    },
    {
      name: 'Mianda',
      role: 'Dotted line manager',
      avatar: '/assets/icons/user-2.svg'
    }
  ];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openCrewAdd(): void {
    const dialogRef = this.dialog.open(SprintCrewAddDialogComponent, {
      width: '75vw',
      maxWidth: '75vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
