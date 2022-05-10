import { ActivatedRoute, Router } from '@angular/router';
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
  description: any = {};
  draft: any = {};
  allDone = false;
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
  loadCounter = 0;
  uuid: any;
  token: any;
  isDisable = false;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.uuid = params.uuid;
      this.token = params.token;
    });
    this.getData();
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
  getData() {
    this.loadCounter += 1;
    this.http
      .get(`${environment.baseurl}/nomineeresponse/get-data`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
          uuid: `${this.uuid}`,
        },
      })
      .subscribe(
        (res: any) => {
          this.description = res.description;
          this.draft = res.draft;
          this.transformCapability = res.data.filter(
            (o) => o.capabilityType === 'Transform'
          );
          this.performCapability = res.data.filter(
            (o) => o.capabilityType === 'Perform'
          );
          this.energiseCapability = res.data.filter(
            (o) => o.capabilityType === 'Energize'
          );
          this.transformCapability.reverse().map((o) => {
            this.transformFeedback = this.transformForm.get(
              'transformFeedback'
            ) as FormArray;
            this.transformFeedback.push(
              this.createTransformArray(
                o.uuid,
                this.draft[o.uuid] ? this.draft[o.uuid].percentage : null,
                this.draft[o.uuid] ? this.draft[o.uuid].importance : null,
                this.draft[o.uuid] ? this.draft[o.uuid].advice : null,
              )
            );
          });
          this.performCapability.reverse().map((o) => {
            this.performFeedback = this.performForm.get(
              'performFeedback'
            ) as FormArray;
            this.performFeedback.push(
              this.createTransformArray(
                o.uuid,
                this.draft[o.uuid] ? this.draft[o.uuid].percentage : null,
                this.draft[o.uuid] ? this.draft[o.uuid].importance : null,
                this.draft[o.uuid] ? this.draft[o.uuid].advice : null,
              )
            );
          });
          this.energiseCapability.reverse().map((o) => {
            this.energiseFeedback = this.energiseForm.get(
              'energiseFeedback'
            ) as FormArray;
            this.energiseFeedback.push(
              this.createTransformArray(
                o.uuid,
                this.draft[o.uuid] ? this.draft[o.uuid].percentage : null,
                this.draft[o.uuid] ? this.draft[o.uuid].importance : null,
                this.draft[o.uuid] ? this.draft[o.uuid].advice : null,
              )
            );
          });
          this.loadCounter -= 1;
        },
        (err) => {
          console.error(err);
          this.router.navigate(['/not-found/']);
          this.loadCounter -= 1;
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
      uuid: this.fb.control(id, Validators.required),
      percentageRating: this.fb.control(percentRating, Validators.required),
      rating: this.fb.control(importanceRating, Validators.required),
      advice: this.fb.control(adviceText),
    });
  }

  storePerformData() {
    this.isPerformSubmit = true;
    if (this.performForm.valid) {
      this.isDisable = true;
      this.loadCounter += 1;
      this.http
        .post(
          `${environment.baseurl}/nomineeresponse/save`,
          this.performForm.value.performFeedback,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              uuid: `${this.uuid}`,
            },
          }
        )
        .subscribe(
          (res: any) => {
            this.performDone = true;
            window.scroll(0, 0);
          },
          (err) => {
            console.error(err);
          },
          () => {
            this.loadCounter -= 1;
            this.isDisable = false;

          }
        );
    }
  }
  storeEnergiseData() {
    this.isEnergiseSubmit = true;
    if (this.energiseForm.valid) {
      this.isDisable = true;
      this.loadCounter += 1;
      this.http
        .post(
          `${environment.baseurl}/nomineeresponse/save`,
          this.energiseForm.value.energiseFeedback,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              uuid: `${this.uuid}`,
            },
          }
        )
        .subscribe(
          (res: any) => {
            this.energiseDone = true;
            window.scroll(0, 0);
          },
          (err) => {
            console.error(err);
          },
          () => {
            this.loadCounter -= 1;
            this.isDisable = false;
          }
        );
    }
  }
  backToPerform() {
    window.scroll(0, 0);
    this.isPerformSubmit = false;
    this.performDone = false;
  }
  storeTransformData() {
    this.isTransformSubmit = true;
    if (this.transformForm.valid) {
      this.isDisable = true;
      this.loadCounter += 1;
      this.http
        .post(
          `${environment.baseurl}/nomineeresponse/save`,
          this.transformForm.value.transformFeedback,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              uuid: `${this.uuid}`,
            },
          }
        )
        .subscribe(
          (res: any) => {
            window.scroll(0, 0);
          },
          (err) => {
            console.error(err);
          },
          () => {
            this.loadCounter -= 1;
            this.isDisable = false;
          }
        );
    }
  }
  submit() {
    this.isTransformSubmit = true;
    if (this.transformForm.valid) {
      this.isDisable = true;

      this.loadCounter += 1;
      this.http
        .post(
          `${environment.baseurl}/nomineeresponse/submit`,
          this.transformForm.value.transformFeedback,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
              uuid: `${this.uuid}`,
            },
          }
        )
        .subscribe(
          (res: any) => {
            this.transformDone = true;
            this.allDone = true;
            window.scroll(0, 0);
          },
          (err) => {
            console.error(err);
          },
          () => {
            this.loadCounter -= 1;
            this.isDisable = false;
          }
        );
      // .toPromise()
      // .then((res: any) => {
      //   console.log(res.data);
      //   this.energiseDone = true;
      // })
      // .catch((err) => {
      //   console.error(err);
      // })
      // .finally(() => {
      //   console.log('done');
      // });
    }
  }
  backToEnergise() {
    window.scroll(0, 0);
    this.isEnergiseSubmit = false;
    this.energiseDone = false;
  }
  getTransformFormArray(i) {
    const val = this.transformForm.get('transformFeedback') as FormArray;
    return val.at(i);
  }
  getPerformFormArray(i) {
    const val = this.performForm.get('performFeedback') as FormArray;
    return val.at(i);
  }
  getEnergiseFormArray(i) {
    const val = this.energiseForm.get('energiseFeedback') as FormArray;
    return val.at(i);
  }
  close(){
    window.close();
  }
}
