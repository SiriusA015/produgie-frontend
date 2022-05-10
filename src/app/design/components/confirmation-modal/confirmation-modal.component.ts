import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfigService } from '../../../shared/service/config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../src/environments/environment';
const baseUrl = environment.baseurl;
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {
  id: any;

  constructor(public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private configService: ConfigService,  private http: HttpClient,) {
      this.id = this.data.element.id;
    }

  ngOnInit(): void {
  }
  onConfirm() {
          this.configService.setConfig({ isLoader: true });
          
          // const finalPayload = [this.editScrewForm.value];
          this.http.delete(`${baseUrl}/sprintcrew/delete-sprintcrew/${this.id}`)
            .subscribe(
              (res1: any) => {
                console.log(res1);
                if (res1.status === 200) {
                  this.configService.setConfig({ isLoader: false });
                  this.dialogRef.close(true);
                  // this.dialogRef.close(true);
                  // if (this.message?.isEdit) {
                  //   this.dataService.nextMessage({ isEdit: false });
                  //   this.router.navigate(['/design/sprint-final']);
                  // } else {
                  //   this.router.navigate(['/design/sprint-frequency']);
                  // }
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
