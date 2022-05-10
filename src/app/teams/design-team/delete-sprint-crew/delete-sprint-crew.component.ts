import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConfigService } from 'src/app/shared/service/config.service';
import { DesignService } from '../design.service';

@Component({
  selector: 'app-delete-sprint-crew',
  templateUrl: './delete-sprint-crew.component.html',
  styleUrls: ['./delete-sprint-crew.component.scss']
})
export class DeleteSprintCrewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteSprintCrewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private designService: DesignService,private configService:ConfigService,
    private toastr: ToastrService,) {
    console.log(data);

  }

  ngOnInit(): void {
  }
  onConfirm() {
    let id = this.data.element.id;
    this.designService.deleleSprintCrew(id).subscribe((res: any) => {
      this.configService.setConfig({ isLoader: false });
      this.onDismiss();
      // this.toastr.success('Success', res.responseMsg, {
      //   timeOut: 3000,
      // });
    }, error => {

    })


  }
  onDismiss() {
    this.dialogRef.close(false);
  }

}

