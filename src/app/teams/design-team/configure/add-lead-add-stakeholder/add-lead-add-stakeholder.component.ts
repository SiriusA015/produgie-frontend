import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DesignService } from '../../design.service';

@Component({
  selector: 'app-add-lead-add-stakeholder',
  templateUrl: './add-lead-add-stakeholder.component.html',
  styleUrls: ['./add-lead-add-stakeholder.component.scss']
})
export class AddLeadAddStakeholderComponent implements OnInit {
  leadList: any;
  selectedLead: any;
  selectedDevice: any;
  formBuilder: any;
  stakeholderForm: FormGroup;
  submitted = false;
  isStakeholderSubmited = false;
  isLeadSubmited = false;
  teamId: string;
  sprint_id: string;

  constructor(public dialogRef: MatDialogRef<AddLeadAddStakeholderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private designService: DesignService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    console.log(this.data);
  }


  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  ngOnInit(): void {
    console.log(this.data, "this.data");

    this.designService.getLead().subscribe((res: any) => {
      this.leadList = res;
    })

    this.stakeholderForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });


  }
  onChange(event) {
    this.selectedLead = event;
  }
  get f() { return this.stakeholderForm.controls; }

  onSubmit() {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.sprint_id = localStorage.getItem('sprint_Id');
    this.isStakeholderSubmited = true;
    Object.keys(this.stakeholderForm.controls).forEach(field => {
      const control = this.stakeholderForm.get(field);
      control.markAsTouched({ onlySelf: true });
    });
    if (this.stakeholderForm.valid) {
      const finalPayload = this.stakeholderForm.value;
      let data = {
        name: finalPayload.name,
        email: finalPayload.email,
        selected_action_id: this.data.id,
        isCustom: false,
        team_id: parseInt(this.teamId),
        sprint_id: parseInt(this.sprint_id)
      }

      if (this.data == null) {
        this.isStakeholderSubmited = false;
        this.toastr.warning('Warning', "Please select an action to add stakeholder", {
          timeOut: 3000,
        });
        return;
      }
      this.designService.addActionStackHolder(data)
        .subscribe(
          (res1: any) => {
            console.log(res1);
            this.isStakeholderSubmited = false;
            this.toastr.success('Success', "Stakeholder Added Successfully", {
              timeOut: 3000,
            });
            // res1.message

            this.stakeholderForm.reset();
            // this.dialogRef.close();

          },
          (err) => {
            this.isStakeholderSubmited = false;
            console.error('errorrrrr', err);
            this.toastr.error('Error', err.error.errorMessage, {
              timeOut: 3000,
            });
          }
        );
    }
  }

  addLead() {
    this.teamId = localStorage.getItem('selectedTeamId');
    this.isLeadSubmited = true;
    if (this.selectedLead) {
      let data = {
        "lead_id": this.selectedLead,
        "selected_action_id": this.data.id,
        "team_id": this.teamId,
        "isCustom": this.data.isCustom
      }
      this.designService.addLead(data).subscribe((res: any) => {
        this.isLeadSubmited = false;
        this.toastr.success('Success', "Lead Added Successfully", {
          timeOut: 3000,
        });
      },
        err => {
          this.toastr.error('error', err.error.errorMessage, {
            timeOut: 3000,
          });
        }
      )
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
