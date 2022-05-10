import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { ConfirmationDialogComponent } from '../../../../explore/components/modals/confirmation-dialog/confirmation-dialog.component'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface DialogData {
  value: string;
  totalQuestion: number;
}

@Component({
  selector: 'app-alignment-survey',
  templateUrl: './alignment-survey.component.html',
  styleUrls: ['./alignment-survey.component.scss'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'accent' },
    },
  ],
})
export class AlignmentSurveyComponent implements OnInit {
  loadCounter = 0;
  questionList: any = [];
  answersList: any = [];
  answerSubmitted: any = 0;
  progressCount: any = [];
  isNextPageAvailable: boolean = false;
  questionLimit: any = 10;
  questionPage: any = 1;
  styleSubmittedAns: any = [];
  attemptedAnswers: any = [];
  questionCount: any = 0;
  totalAttemptedAnswers: number = 0;
  radioselectedcountforperticular: number = 0;
  radioselectionsount: any = [];
  totalQuestion: any = 0;
  remainingQuestions: any = 0;
  alreadyanswerSubmitted: any = 0;
  newlyAttemptedArr: any = [];
  alreadyAttemptedCount: number = 0;
  attemptedPercentage: any = 0;

  questionParams: any;
  totalPage: any;
  isLastPage: boolean;
  researchQuestion: any;
  newTempCount = 45;
  totalAttemptedQuestions: any;

  constructor(
    public dialogRef: MatDialogRef<AlignmentSurveyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
    this.totalPage = this.data.questionData.total_page;
    this.questionList = this.data.questionData.response.question;
    this.answersList = this.data.questionData.response.answer != undefined ? this.data.questionData.response.answer : [];
    this.buildQuestionAnswersList();
    this.isNextPageAvailable = this.data.questionData.hasNext;
    // this.alreadyAttemptedCount = this.data.questionData.attemptedQuestions != undefined ? this.data.questionData.attemptedQuestions : 0;

    this.alreadyAttemptedCount = this.data.questionData.response.answer != undefined ? this.data.questionData.response.answer.length : 0;
    this.totalQuestion = this.data.questionData.total_question;
    this.totalAttemptedQuestions = this.data.questionData.totalAttemptedQuestions;
    this.remainingQuestions = this.newTempCount - this.totalAttemptedQuestions;
    this.calculatePercentage(this.totalAttemptedQuestions, this.totalQuestion);
  }

  calculatePercentage(attemptedCount, totalCount) {
    totalCount = 45;
    this.attemptedPercentage = ((attemptedCount * 100) / totalCount).toFixed(2);
  }

  private initiateStyleSubmittedAnswers(questionList: Array<any> = []) {
    try {
      for (const question of questionList) {
        if (
          Array.isArray(this.styleSubmittedAns) &&
          this.styleSubmittedAns.filter(
            (val) => val.question_id === question.unique_ref_id
          ).length === 0
        ) {
          this.styleSubmittedAns.push({
            answer: 'N/A',
            question_id: question.unique_ref_id,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  radioChange(event, questionId) {
    this.buildAttemptedList(event.value, questionId);

    let attemptedQueIds = [];

    if (this.answersList?.length > 0) {
      attemptedQueIds = this.answersList.filter(
        (answersObj) => answersObj.answer != 'N/A'
      );

      attemptedQueIds = attemptedQueIds.map(
        (answersObj) => answersObj.question_id
      );
    }

    if (!attemptedQueIds.includes(questionId)) {
      if (!this.newlyAttemptedArr.includes(questionId)) {
        this.newlyAttemptedArr.push(questionId);
        this.alreadyAttemptedCount++;
        this.remainingQuestions--;
        this.totalAttemptedQuestions++
      }
    }

    this.calculatePercentage(this.totalAttemptedQuestions, this.totalQuestion);

    if (this.styleSubmittedAns.length) {
      for (let ans = 0; ans < this.styleSubmittedAns.length; ans++) {
        if (this.styleSubmittedAns[ans].question_id == questionId) {
          this.styleSubmittedAns.splice(ans, 1, {
            answer: event.value,
            question_id: questionId,
          });
          break;
        } else if (ans == this.styleSubmittedAns.length - 1) {
          this.styleSubmittedAns.push({
            answer: event.value,
            question_id: questionId,
          });
        }
      }
    } else {
      this.styleSubmittedAns.push({
        answer: event.value,
        question_id: questionId,
      });
    }

    // for progress bar
    if (this.progressCount.indexOf(questionId) == -1) {
      this.questionCount++;
      this.progressCount.push(questionId);
    } else {
      this.progressCount.splice(
        this.progressCount.indexOf(questionId),
        1,
        questionId
      );
    }

    // perticular 20 questions
    if (this.radioselectionsount.indexOf(questionId) == -1) {
      this.radioselectedcountforperticular++;
      this.radioselectionsount.push(questionId);
    } else {
      this.radioselectionsount.splice(
        this.radioselectionsount.indexOf(questionId),
        1,
        questionId
      );
    }
  }

  async continueQuestion() {
    try {
      if (this.alreadyAttemptedCount < this.questionList.length) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '600px',
          data: {
            value: this.alreadyAttemptedCount,
            totalQuestion: this.questionList?.length,
          },
        });

        dialogRef.afterClosed().subscribe(async (result) => {
          if (result.isCancel) {
            if (this.isNextPageAvailable) {
              this.loadCounter = 1;
              this.remainingQuestions =
                this.remainingQuestions -
                this.questionList.length +
                this.totalAttemptedAnswers;
              const submitedAns = await this.saveAnswers();
              this.questionPage++;
              this.answersList = [];

              let questions = await this.getQuestionsData();
              this.loadCounter = 0;
              this.radioselectedcountforperticular = 0;
              this.radioselectionsount.length = 0;
              this.attemptedAnswers = [];
              this.newlyAttemptedArr = [];
              this.questionList = [];
              this.alreadyAttemptedCount =
                questions['attemptedQuestions'] != undefined ? questions['attemptedQuestions'] : 0;

              /* calculate percentage */
              this.calculatePercentage(
                this.totalAttemptedQuestions,
                questions['total_question']
              );

              this.questionList = questions['response'].question;
              this.answersList = questions['response'].answer != undefined ? questions['response'].answer : [];
              this.isNextPageAvailable = questions['hasNext'];
              this.buildQuestionAnswersList();
              this.initiateStyleSubmittedAnswers(this.questionList);
              this.totalQuestion = questions['total_question'];
              this.questionCount = 0;

              document
                .getElementsByClassName('firstQuestion')
                ?.item(0)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              // this.lastPageSubmision();
            }
          }
        });
      } else {
        if (this.isNextPageAvailable) {
          this.loadCounter = 1;

          const submitedAns = await this.saveAnswers();
          this.questionPage++;
          this.answersList = [];

          let questions = await this.getQuestionsData();
          this.loadCounter = 0;
          this.radioselectedcountforperticular = 0;
          this.radioselectionsount.length = 0;
          this.attemptedAnswers = [];
          this.newlyAttemptedArr = [];
          this.questionList = [];

          this.alreadyAttemptedCount =
            questions['attemptedQuestions'] != undefined ? questions['attemptedQuestions'] : 0;

          /* calculate percentage */
          this.calculatePercentage(
            this.totalAttemptedQuestions,
            questions['total_question']
          );

          this.questionList = questions['response'].question;
          this.answersList = questions['response'].answer != undefined ? questions['response'].answer : [];
          this.isNextPageAvailable = questions['hasNext'];
          this.buildQuestionAnswersList();
          this.initiateStyleSubmittedAnswers(this.questionList);
          this.questionCount = 0;

          document
            .getElementsByClassName('firstQuestion')
            ?.item(0)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // this.lastPageSubmision();
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async saveAndExit() {
    try {
      this.loadCounter = 1;
      const submitedAns = await this.saveAnswers();
      this.loadCounter = 0;
      this.dialogRef.close({
        isCancel: false,
        data: true,
        isResearchComplete: true,
        isCloseAllModel: true,
        status: true
      });
    } catch (error) {
      console.log(error);
    }
  }


  // Get Question's List
  async getQuestionsData() {
    if (this.questionPage === this.totalPage) {
      this.isLastPage = true;
      this.researchQuestion = true;
    }
    this.questionParams = {
      'pageNo': this.questionPage,
      'pageSize': this.questionLimit,
      'direction': 'ASC',
      'sortBy': 'id',
      'user_id': this.data.params.user_id,
      'team_id': this.data.params.team_id,
      'user_type': this.data.params.type,
    }
    const questions = this.http
      .get(
        `${environment.teamBaseUrl}/guest/getQuestions?pageNo=${this.questionPage}&pageSize=${this.questionLimit}&direction=ASC&sortBy=id&user_id=${this.data.params.user_id}&team_id=${this.data.params.team_id}&user_type=${this.data.params.type}`
      )
      .toPromise();
    return questions;
  }

  /* SAVE answers */
  async saveAnswers() {
    try {
      let requestBody = {
        "commonField": {
          "user_id": this.data.params.user_id,
          "user_type": this.data.params.type,
          "team_id": this.data.params.team_id
        },
        "pageNo": this.questionPage,
        "attempted_questions": this.attemptedAnswers.length,
        answers: this.attemptedAnswers
      }

      if (this.questionPage === this.totalPage) {
        requestBody['research_question'] = true;
      }
      const submitedAns = await this.http
        .post(`${environment.teamBaseUrl}/guest/saveAnswers`, requestBody)
        .toPromise();
      return submitedAns;
    } catch (error) {
      console.log(error);
    }
  }

  /* Build questions and answers final array */
  buildQuestionAnswersList() {
    const questionList = this.questionList.map((question) => {
      if (this.answersList.length) {
        let answer_obj = this.answersList.find((answer) => {
          if (answer.question_id == question.unique_ref_id) {
            return answer;
          }
        });

        question.answer = answer_obj?.answer || 'N/A';
        if (answer_obj != undefined && answer_obj.answer != 'N/A') {
          this.attemptedAnswers.push({ answer: answer_obj.answer, question_id: question.unique_ref_id });
        }
      }
      return question;
    });
    this.questionList = questionList;
  }

  private buildAttemptedList(answer, question_id) {
    if (this.attemptedAnswers.length) {
      for (let ans = 0; ans < this.attemptedAnswers.length; ans++) {
        if (this.attemptedAnswers[ans].question_id == question_id) {
          this.attemptedAnswers.splice(ans, 1, {
            answer: answer,
            question_id: question_id,
          });
          break;
        } else if (ans == this.attemptedAnswers.length - 1) {
          this.attemptedAnswers.push({
            answer: answer,
            question_id: question_id,
          });
        }
      }
    } else {
      this.attemptedAnswers.push({
        answer: answer,
        question_id: question_id,
      });
    }

    /* To get count of total attempted */
    const attemptedCountArr = this.attemptedAnswers.filter((ans) => {
      return ans.answer != 'N/A';
    });

    this.totalAttemptedAnswers = attemptedCountArr?.length;
    this.alreadyanswerSubmitted = (
      (this.totalAttemptedAnswers * 100) /
      this.totalQuestion
    ).toFixed(2);
  }


  cancel() {
    this.dialogRef.close({ isCancel: true, data: true });
  }

}
