import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfigService } from '../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  id: any;

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private configService: ConfigService,  private http: HttpClient,) {
      console.log('iddd' , data)
      this.id = this.data.description.activityDetails.id;
    }

  ngOnInit(): void {
  }
  onConfirm() {
          this.configService.setConfig({ isLoader: true });
          
          // const finalPayload = [this.editScrewForm.value];
          this.http.delete(`${environment.baseurl}/actionactivity/delete/${this.id}`)
            .subscribe(
              (res: any) => {
                console.log(res);
                if(res.status == 200){
                  this.dialogRef.close();
                  window.location.reload();
                  }
              },
              (err) => console.log(err)
            );
        
    
        // this.sprintcrew = this.crewForm.get('crew') as FormArray;
        // this.sprintcrew.push(this.createItemRow());
        // if (this.crewForm.valid) {
        //   this.dataService.nextMessage({ crew: true });
        // } else {
        //   this.dataService.nextMessage({ crew: false });
        // }
      
    
  }

  onDismiss() {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}



