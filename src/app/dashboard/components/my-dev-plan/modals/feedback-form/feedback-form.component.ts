import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.scss']
})
export class FeedbackFormComponent implements OnInit {

  feedbackForm: FormGroup;
  behaviourFeedback: FormArray;
  outcomeFeedback: FormArray;
  placeholderText = 'Write your feedback';
  uuid: any;
  token: any;
  constructor(public dialogRef: MatDialogRef<FeedbackFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
              private http: HttpClient) { }

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
  createOutcomeArray1(id: number, rating) {
    return this.fb.group({
      id: this.fb.control(id, Validators.required),
      rating: this.fb.control(rating, Validators.required)
    });
  }
  createBehaviourArray(id: number, rating) {
    const behaviour = _.find(this.data.selectedBehaviour, (a) => a.behaviourId === id);
    return this.fb.group({
      id: this.fb.control(behaviour.id, Validators.required),
      rating: this.fb.control(rating, Validators.required)
    });
  }
  createOutcomeArray(id: number, rating) {
    const outcome = _.find(this.data.selectedOutcome, (a) => a.outcomeId === id);
    return this.fb.group({
      id: this.fb.control(outcome.id, Validators.required),
      rating: this.fb.control(rating, Validators.required)
    });
  }
  saveFeedback() {
    const uuid = this.data.uuid;
    const token = this.data.token;
    if (this.feedbackForm.valid) {
      const payload = this.feedbackForm.value;
      this.http.post(`${environment.baseurl}/userfeedback/save`, payload, {
        headers : {
          Authorization : `Bearer ${token}`,
          uuid: `${uuid}`
        }
      }).subscribe(
        res => {
          this.dialogRef.close({isCancel: false, feedback: payload});
        },
        err => console.error(err)
      );
    }
  }
  storeFeedback(){
    const uuid = this.data.uuid;
    const token = this.data.token;
    if (this.feedbackForm.valid) {
      const payload = this.feedbackForm.value;
      this.http.post(`${environment.baseurl}/userfeedback/publish`, payload, {
        headers : {
          Authorization : `Bearer ${token}`,
          uuid: `${uuid}`
        }
      }).subscribe(
        res => {
          this.dialogRef.close({isCancel: false, feedback: payload});
        },
        err => console.error(err)
      );
    }
  }

}
