import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-final-feedback-form',
  templateUrl: './final-feedback-form.component.html',
  styleUrls: ['./final-feedback-form.component.scss'],
})
export class FinalFeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  behaviourFeedback: FormArray;
  outcomeFeedback: FormArray;
  placeholderText = 'Write your feedback';
  uuid: any;
  token: any;
  isLoading = false;
  submitted : boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FinalFeedbackFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient,
    private httpBackend: HttpBackend
  ) {
    this.http = new HttpClient(httpBackend);
  }

  ngOnInit(): void {
    this.feedbackForm = this.fb.group({
      feedback: this.fb.control(null, Validators.required),
      feedbackAdvice: this.fb.control(null, Validators.required),
      sprintRating: this.fb.control(null, Validators.required),
      behaviourFeedback: this.fb.array([], Validators.required),
      outcomeFeedback: this.fb.array([], Validators.required),
    });

    console.log("this.data")
    console.log(this.data)
    
    if (this.data.isEdit) {
      const feedbackData = this.data.feedback;
      this.feedbackForm.get('sprintRating').setValue(this.data.feedback?.sprintRating? this.data.feedback.sprintRating : null);
      this.feedbackForm.get('feedbackAdvice').setValue(this.data.feedback?.feedbackAdvice? this.data.feedback.feedbackAdvice : null)
      this.feedbackForm.get('feedback').setValue(feedbackData.feedback ? feedbackData.feedback : null);
      // this.data.selectedBehaviour.map((o) => {
      //   this.behaviourFeedback = this.feedbackForm.get(
      //     'behaviourFeedback'
      //   ) as FormArray;
      //   var rating = this.data.feedback.filter(x=>x.id==o.id)
      //   console.log("rating")
      //   console.log(rating)
      //   this.behaviourFeedback.push(this.createBehaviourArray1(o.id, rating));
      // });
      this.data.selectedBehaviour.sort((x,y) => x.behaviourId - y.behaviourId).sort((x,y) => x.customBehaviourId - y.customBehaviourId).sort((x,y) => x.isCustom - y.isCustom).map((o)=>{
        var rating = this.data.feedback.behaviourFeedback.filter((x)=>x.id==o.id).legth != 0 ? this.data.feedback.behaviourFeedback.filter((x)=>x.id==o.id).map(y=>y.rating)[0] : null;
        this.behaviourFeedback = this.feedbackForm.get(
          'behaviourFeedback'
        ) as FormArray;
        this.behaviourFeedback.push(this.createBehaviourArray1(o.id, rating));
      })

      this.data.selectedOutcome.sort((x,y) => x.outcomeId - y.outcomeId).sort((x,y) => x.customOutcomeId - y.customOutcomeId).sort((x,y) => x.isCustom - y.isCustom).map((o)=>{
        var rating = this.data.feedback.outcomeFeedback.filter((x)=>x.id==o.id).legth != 0 ? this.data.feedback.outcomeFeedback.filter((x)=>x.id==o.id).map(y=>y.rating)[0] : null;
        this.outcomeFeedback = this.feedbackForm.get(
          'outcomeFeedback'
        ) as FormArray;
        this.outcomeFeedback.push(this.createOutcomeArray1(o.id, rating));
      })
      //  this.data.feedback.behaviourFeedback.map((o) => {
      //    this.behaviourFeedback = this.feedbackForm.get(
      //      'behaviourFeedback'
      //    ) as FormArray;
      //    this.behaviourFeedback.push(this.createBehaviourArray1(o.id, 1));
      //  });
      // this.data.feedback.outcomeFeedback.map((o) => {
      //   this.outcomeFeedback = this.feedbackForm.get(
      //     'outcomeFeedback'
      //   ) as FormArray;
      //   this.outcomeFeedback.push(this.createOutcomeArray1(o.id, 1));
      // });
    } else {
      this.data.behaviour.map((o) => {
        this.behaviourFeedback = this.feedbackForm.get(
          'behaviourFeedback'
        ) as FormArray;
        this.behaviourFeedback.push(this.createBehaviourArray(o.id, null));
      });
      this.data.outcome.map((o) => {
        this.outcomeFeedback = this.feedbackForm.get(
          'outcomeFeedback'
        ) as FormArray;
        this.outcomeFeedback.push(this.createOutcomeArray(o.id, null));
      });
    }
    console.log("data fixed")
    console.log(this.behaviourFeedback)
    console.log(this.outcomeFeedback)
    console.log(this.feedbackForm)
  }

  get f(){
    return this.feedbackForm.controls;
  }
  createBehaviourArray1(id: number, rating) {
    return this.fb.group({
      id: this.fb.control(id, Validators.required),
      rating: this.fb.control(rating, Validators.required),
    });
  }
  createBehaviourArray(id: number, rating) {
    const behaviour = _.find(
      this.data.selectedBehaviour,
      (a) => a.behaviourId === id || a.customBehaviourId === id
    );
    return this.fb.group({
      id: this.fb.control(behaviour.id, Validators.required),
      rating: this.fb.control(rating, Validators.required),
    });
  }
  createOutcomeArray1(id: number, rating) {
    return this.fb.group({
      id: this.fb.control(id, Validators.required),
      rating: this.fb.control(rating, Validators.required),
    });
  }
  createOutcomeArray(id: number, rating) {
    const outcome = _.find(
      this.data.selectedOutcome,
      (a) => a.outcomeId === id || a.customOutcomeId === id
    );
    return this.fb.group({
      id: this.fb.control(outcome.id, Validators.required),
      rating: this.fb.control(rating, Validators.required),
    });
  }
  saveFeedback() {
    this.isLoading = true;
    const uuid = this.data.uuid;
    const token = this.data.token;
    
    const payload = {'behaviourFeedback' : this.feedbackForm.get('behaviourFeedback').value ? this.feedbackForm.get('behaviourFeedback').value : [],'feedback' : this.feedbackForm.get('feedback').value ? this.feedbackForm.get('feedback').value : null,'feedbackAdvice' : this.feedbackForm.get('feedbackAdvice').value ? this.feedbackForm.get('feedbackAdvice').value : null,'outcomeFeedback' : this.feedbackForm.get('outcomeFeedback').value ? this.feedbackForm.get('outcomeFeedback').value : [],'sprintRating' : this.feedbackForm.get('sprintRating').value ? this.feedbackForm.get('sprintRating').value : null};
    this.http
      .post(`${environment.baseurl}/userfeedback/save`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          uuid: `${uuid}`,
        },
      })
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.dialogRef.close({
            isCancel: false,
            feedback: payload,
            stored: false,
          });
        },
        (err) => {
          this.isLoading = false;
          console.error(err);
        }
      );
    //if (this.feedbackForm.valid) {
    //}
  }
  storeFeedback() {
    this.submitted = true;
    console.log(this.feedbackForm)
    const uuid = this.data.uuid;
    const token = this.data.token;
    if (this.feedbackForm.valid) {
      this.isLoading = true;
      const payload = this.feedbackForm.value;
      this.http
        .post(`${environment.baseurl}/userfeedback/publish`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            uuid: `${uuid}`,
          },
        })
        .subscribe(
          (res) => {
            this.dialogRef.close({
              isCancel: false,
              feedback: payload,
              stored: true,
            });
            this.isLoading = false;
          },
          (err) => {
            console.error(err);
            this.isLoading = false;
          }
        );
    }
  }
}
