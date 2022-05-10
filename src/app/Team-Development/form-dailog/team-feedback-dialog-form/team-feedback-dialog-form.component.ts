import { HttpClient, HttpBackend } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import _ from 'lodash';
import { TeamdevelopmentService } from '../../teamdevelopment.service';

@Component({
  selector: 'app-team-feedback-dialog-form',
  templateUrl: './team-feedback-dialog-form.component.html',
  styleUrls: ['./team-feedback-dialog-form.component.scss']
})
export class TeamFeedbackDialogFormComponent implements OnInit {

  feedbackForm: FormGroup;
  behaviourFeedback: FormArray;
  outcomeFeedback: FormArray;
  placeholderText = 'Write your feedback';
  uuid: any;
  token: any;
  isLoading = false;

    constructor(
    private teamDevService : TeamdevelopmentService,
    public dialogRef: MatDialogRef<TeamFeedbackDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
    private http: HttpClient,
    private httpBackend: HttpBackend
    ) { }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      feedback : this.fb.control(null, Validators.required),
      behaviourFeedback: this.fb.array([], Validators.required),
      outcomeFeedback: this.fb.array([], Validators.required)
    });
    if (this.data.isEdit) {
      const feedbackData = this.data.feedback;
      this.feedbackForm.get('feedback').setValue(feedbackData.feedback);
      this.data.feedback.behaviourFeedback.map(o => {
        this.behaviourFeedback = this.feedbackForm.get('behaviourFeedback') as FormArray;
        this.behaviourFeedback.push(this.createBehaviourArray1(o.id, o.rating));
      });
      this.data.feedback.outcomeFeedback.map(o => {
        this.outcomeFeedback = this.feedbackForm.get('outcomeFeedback') as FormArray;
        this.outcomeFeedback.push(this.createOutcomeArray1(o.id, o.rating));
      });
    }else {
      this.data.behaviour.map(o => {
        this.behaviourFeedback = this.feedbackForm.get('behaviourFeedback') as FormArray;
        this.behaviourFeedback.push(this.createBehaviourArray(o.id, null));
      });
      this.data.outcome.map(o => {
        this.outcomeFeedback = this.feedbackForm.get('outcomeFeedback') as FormArray;
        this.outcomeFeedback.push(this.createOutcomeArray(o.id, null));
      });
    }
  }

  createBehaviourArray1(id: number, rating) {
    return this.fb.group({
      id: this.fb.control(id, Validators.required),
      rating: this.fb.control(rating, Validators.required)
    });
  }
  createBehaviourArray(id: number, rating) {
    const behaviour = _.find(this.data.selectedBehaviour, (a) => a.behaviourId === id || a.customBehaviourId === id);
    return this.fb.group({
      id: this.fb.control(behaviour.id, Validators.required),
      rating: this.fb.control(rating, Validators.required)
    });
  }
  createOutcomeArray1(id: number, rating) {
    return this.fb.group({
      id: this.fb.control(id, Validators.required),
      rating: this.fb.control(rating, Validators.required)
    });
  }
  createOutcomeArray(id: number, rating) {
    const outcome = _.find(this.data.selectedOutcome, (a) => a.outcomeId === id || a.customOutcomeId === id);
    return this.fb.group({
      id: this.fb.control(outcome.id, Validators.required),
      rating: this.fb.control(rating, Validators.required)
    });
  }
  saveFeedback() {
    this.isLoading = true;
    const uuid = this.data.uuid;
    // const token = this.data.token;
    if (this.feedbackForm.valid) {
      const payload = this.feedbackForm.value;
     this.teamDevService.addfeedback(payload).subscribe(
        res => {
          this.isLoading = false;
          this.dialogRef.close({isCancel: false, feedback: payload, stored: false});
        },
        err => {
          this.isLoading = false;
          console.error(err);
        }
      );
    }
  }
  storeFeedback(){
  //   const uuid = this.data.uuid;
  //   const token = this.data.token;
  //   if (this.feedbackForm.valid) {
  //     this.isLoading = true;
  //     const payload = this.feedbackForm.value;
  //     this.http.post(`${environment.baseurl}/userfeedback/publish`, payload, {
  //       headers : {
  //         Authorization : `Bearer ${token}`,
  //         uuid: `${uuid}`
  //       }
  //     }).subscribe(
  //       res => {
  //         this.dialogRef.close({isCancel: false, feedback: payload, stored: true});
  //         this.isLoading = false;
  //       },
  //       err => {
  //         console.error(err);
  //         this.isLoading = false;
  //       }
  //     );
  //   }
  }

}
