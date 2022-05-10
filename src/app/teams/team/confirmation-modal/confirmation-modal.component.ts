import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeamService } from '../../team.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SprintServiceService } from '../../sprint-team/sprint-service.service';
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(private sprintService: SprintServiceService, public dialogRef: MatDialogRef<ConfirmationModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, 
              private teamService: TeamService,
              private snackBar: MatSnackBar) { 
                console.log(data);
                
      
    }

  ngOnInit(): void {
  }
  onConfirm(){
     if(this.data.type == 'delete'){
    let id = this.data.data;
   this.sprintService.deleteEvent(id).subscribe((res:any)=>{
     console.log(res);
     window.location.reload();
     
   },error=>{
    console.log(error);
   })
     }
    else{
    let id = this.data.data.id;
    if(this.data.data.type == "Guest"){
      
      this.teamService.removeTeamMemberByGuest(id).subscribe((res:any)=>{
        this.snackBar.open("Team Member Removed Successfully", 'Ok', {
          duration: 3000,
        });
        this.dialogRef.close(true);
       
      },error=>{
        this.snackBar.open("Something Went wrong", 'Ok', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      })
    }
    else{
      this.teamService.removeTeamMemberByOrg(id).subscribe((res:any)=>{
        this.snackBar.open("Team Member Removed Successfully", 'Ok', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      },error=>{
        this.snackBar.open("Something Went wrong", 'Ok', {
          duration: 3000,
        });

        this.dialogRef.close(true);
      })
    }
  }
  }
  onDismiss(){
    this.dialogRef.close(false);
  }
  
}
