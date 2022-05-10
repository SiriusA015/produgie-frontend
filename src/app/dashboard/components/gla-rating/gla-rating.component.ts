import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { FeedbackFormComponent } from 'src/app/development/components/dev-plan/modals/feedback-form/feedback-form.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gla-rating',
  templateUrl: './gla-rating.component.html',
  styleUrls: ['./gla-rating.component.scss'],
})
export class GlaRatingComponent implements OnInit {
  isTransformSubmit = false;
  isPerformSubmit = false;
  isEnergiseSubmit = false;
  transformDone = false;
  performDone = false;
  energiseDone = false;
  transformCapability = [];
  transformForm: FormGroup;
  transformFeedback: FormArray;
  performCapability = [];
  performForm: FormGroup;
  performFeedback: FormArray;
  energiseCapability = [];
  energiseForm: FormGroup;
  energiseFeedback: FormArray;
  placeholderText = 'Type in here';
  uuid: any;
  token: any;
  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.getCapability();
    this.transformForm = this.fb.group({
      transformFeedback: this.fb.array([], Validators.required),
    });
    this.performForm = this.fb.group({
      performFeedback: this.fb.array([], Validators.required),
    });
    this.energiseForm = this.fb.group({
      energiseFeedback: this.fb.array([], Validators.required),
    });
  }
  getCapability() {
    this.http.get(`${environment.baseurl}/capability/get-capability`).subscribe(
      (res: any) => {
        console.log(res.data);
        this.transformCapability = res.data.filter(
          (o) => o.capabilityType === 'Transform'
        );
        this.performCapability = res.data.filter(
          (o) => o.capabilityType === 'Perform'
        );
        this.energiseCapability = res.data.filter(
          (o) => o.capabilityType === 'Energize'
        );
        this.transformCapability.map((o) => {
          this.transformFeedback = this.transformForm.get(
            'transformFeedback'
          ) as FormArray;
          this.transformFeedback.push(
            this.createTransformArray(o.uuid, null, null, null)
          );
        });
        this.performCapability.map((o) => {
          this.performFeedback = this.performForm.get(
            'performFeedback'
          ) as FormArray;
          this.performFeedback.push(
            this.createTransformArray(o.uuid, null, null, null)
          );
        });
        this.energiseCapability.map((o) => {
          this.energiseFeedback = this.energiseForm.get(
            'energiseFeedback'
          ) as FormArray;
          this.energiseFeedback.push(
            this.createTransformArray(o.uuid, null, null, null)
          );
        });
      },
      (err) => {
        console.error(err);
      }
    );
  }
  createTransformArray(
    id: number,
    percentRating,
    importanceRating,
    adviceText
  ) {
    return this.fb.group({
      id: this.fb.control(id, Validators.required),
      percentRating: this.fb.control(percentRating, Validators.required),
      importanceRating: this.fb.control(importanceRating, Validators.required),
      adviceText: this.fb.control(adviceText),
    });
  }

  storeTransformData() {
    this.isTransformSubmit = true;
    if (this.transformForm.valid) {
      this.transformDone = true;
    }
  }
  storePerformData() {
    this.isPerformSubmit = true;
    if (this.performForm.valid) {
    this.performDone = true;
    }
  }
  storeEnergiseData() {
    this.isEnergiseSubmit = true;
    if (this.energiseForm.valid) {
    this.energiseDone = true;
    const payload = [
      ...this.transformForm.value.transformFeedback,
      ...this.performForm.value.performFeedback,
      ...this.energiseForm.value.energiseFeedback,
    ];
    console.log(payload);
    }
  }
  getTransformFormArray(i){
    const val = this.transformForm.get(
      'transformFeedback'
    ) as FormArray;
    return val.at(i);
  }
  getPerformFormArray(i){
    const val = this.performForm.get(
      'performFeedback'
    ) as FormArray;
    return val.at(i);
  }
  getEnergiseFormArray(i){
    const val = this.energiseForm.get(
      'energiseFeedback'
    ) as FormArray;
    return val.at(i);
  }
}
