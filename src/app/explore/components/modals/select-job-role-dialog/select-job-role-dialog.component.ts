import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalModalDataService } from '../../../service/local-modal-data.service';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  COUNTRY_LIST,
  BUSINESS_GROUPS,
  ETHNICAL_GROUPS,
  CULTURAL_GROUPS,
  SNACKBAR_MESSAGE,
} from '../../../../shared/models/constants';
import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { CountryCode, CountryCodes } from '../../modals/country-codes';
export interface DialogData {
  value: string;
  totalQuestion: number;
}

@Component({
  selector: 'app-select-job-role-dialog',
  templateUrl: './select-job-role-dialog.component.html',
  styleUrls: ['./select-job-role-dialog.component.scss'],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'accent' },
    },
  ],
})
export class SelectJobRoleDialogComponent implements OnInit {
  countryCodes: Array<CountryCode> = CountryCodes;
  currentRole = [];
  selectedRoleDemands = [];
  isAdded = false;
  loadCounter = 0;
  isinfoDiv: boolean = true;
  isCurrentRoleLevel = false;
  infoData: any = '';
  selectedLevel: any = 0;
  isMCQSection: any = false;
  questionList: any = [];
  answersList: any = [];
  answerSubmitted: any = 0;
  progressCount: any = [];
  progressCountforans: any = [];
  isCompletedFirstPart = false;
  levelData: any = [];
  isNextPageAvailable: boolean = false;
  questionLimit: any = 10;
  questionPage: any = 1;
  questionRole: any = '';
  questionsTitle: any = '';
  styleSubmittedAns: any = [];
  attemptedAnswers: any = [];
  questionCount: any = 0;
  totalAttemptedAnswers: number = 0;
  radioselectedcountforperticular: number = 0;
  radioselectionsount: any = [];

  currentView: string;
  AgeList = [];
  researchQuestions: FormGroup;
  Genders = [];
  EducationLevels = [];
  CountryList = [];
  BusinessGroups = [];
  EthnicalGroups = [];
  CulturalGroups = [];
  totalQuestion: any = 0;
  remainingQuestions: any = 0;
  @ViewChild('scrollToThisPoint') scrollToTopStrategyEle: ElementRef;
  countries: Object;
  tempvalue: any;
  alreadyanswerSubmitted: any = 0;
  attemptedanslist: any;

  newlyAttemptedArr: any = [];
  alreadyAttemptedCount: number = 0;
  attemptedPercentage: any = 0;
  totalPages:number = 1;
  current_page:number = 1;
  number: number;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<SelectJobRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private localService: LocalModalDataService,
    public dialog: MatDialog,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadMockApis();
    this.styleSubmittedAns = [];

    this.isinfoDiv = this.data.isInfoDiv ? this.data.isInfoDiv : false;
    this.isinfoDiv
      ? (this.infoData = this.localService.styleInfoPageData)
      : (this.infoData = '');
    this.isCurrentRoleLevel = this.data.isCurrentRoleLevel
      ? this.data.isCurrentRoleLevel
      : false;
    this.isCompletedFirstPart = this.data.isCompletedFirstPart
      ? this.data.isCompletedFirstPart
      : false;
    this.currentRole = this.data.roles;
    this.levelData = this.data.isCurrentRoleLevel ? this.data.roleData : [];
    this.selectedRoleDemands = this.data.selected;
    this.isAdded = this.data.isAdded;
    this.isMCQSection = this.data.isMCQ ? this.data.isMCQ : false;
    this.totalPages = this.data?.questionData?.total_page;
    this.current_page = this.data?.questionData?.current_page;

    this.isMCQSection
      ? (this.questionList = this.data.questionData.questions)
      : (this.questionList = []);
    this.isMCQSection
      ? (this.answersList = this.data.questionData.answers)
      : (this.answersList = []);
    this.isMCQSection
      ? (this.totalQuestion = this.data.questionData.total_question)
      : (this.totalQuestion = 0);

    this.isMCQSection
      ? (this.questionRole = this.data.role)
      : (this.questionRole = '');
    this.isMCQSection
      ? (this.isNextPageAvailable = this.data.questionData.hasNext)
      : (this.isNextPageAvailable = false);
    this.isMCQSection
      ? (this.questionsTitle = this.data.title)
      : (this.questionsTitle = '');
      if(this.questionsTitle == 'Style'){
        this.number = 1
      }
      else if (this.questionsTitle == 'Strategy' ){
        this.number = 2
      }
      else{
        this.number = 3
      }
    this.data.currentView == 'RESEARCH_QUESTIONS_1'
      ? this.openResearchPart()
      : '';
    this.alreadyAttemptedCount = this.data.questionData.attemptedQuestions
      ? this.data.questionData.attemptedQuestions
      : 0;

    this.initiateStyleSubmittedAnswers(this.questionList);
    // this.selectedRoleDemands.map()
    /* marks previously selected answers as a selected */
    // this.getsavedanslistforper();

    this.buildQuestionAnswersList();

    this.remainingQuestions =
      this.totalQuestion - this.data.questionData.attemptedQuestions;

    /* calculate percentage */
    this.calculatePercentage(
      this.data.questionData.attemptedQuestions,
      this.data.questionData.total_question
    );
  }

  private loadMockApis() {
    this.AgeList = this.getAgeList();
    this.Genders = this.getGenders();
    this.EducationLevels = this.getEducationLevels();
    this.CountryList = this.getCountryList();
    this.BusinessGroups = this.getBusinessGroups();
    this.EthnicalGroups = this.getEhnicalGroups();
    this.CulturalGroups = this.getCulturalGroups();
  }

  /**
   * Saves challenges selected by user to DB
   * @param selectedChallenges - Array of IDs of selected challenges
   */
  private async saveChallenges(selectedChallenges: Array<any>) {
    try {
      const url = `${environment.baseurl}/selectedjobrole/add-by-rank`;
      const resp = await this.http
        .post(url, { job: selectedChallenges })
        .toPromise();
      return resp;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async saveRoleChallenges() {
    if (this.selectedRoleDemands?.length === 3) {
      const saveSelection = await this.saveChallenges(this.selectedRoleDemands);
      if (saveSelection && saveSelection['success']) {
        this.dialogRef.close({
          isCancel: false,
          data: this.selectedRoleDemands,
        });
      } else {
        // TODO: Handle api failure scenario here like showing error message
        this.openSnackBar(SNACKBAR_MESSAGE.SAVE_CHALLENGES_FAIL);
        this.dialogRef.close({
          isCancel: false,
          data: this.selectedRoleDemands,
        });
      }
    }
  }

  cancel() {
    this.dialogRef.close({ isCancel: true, data: true });
    window.location.reload();
  }

  selectRole() {
    this.dialogRef.close({ isCancel: false, data: true });
  }

  calculatePercentage(attemptedCount, totalCount) {
    this.attemptedPercentage = ((attemptedCount * 100) / totalCount).toFixed(2);
  }

  async selectRolesubmit() {
    if (this.selectedLevel) {
      const resp = await this.http
        .post(`${environment.baseurl}/question/set-role`, {
          role: this.selectedLevel,
        })
        .toPromise();
      if (resp && resp['success']) {
        this.dialogRef.close({ isCancel: false, data: this.selectedLevel });
      } else {
        // TODO: Handle failure condition here
        this.openSnackBar(SNACKBAR_MESSAGE.ROLE_UPDATE_FAIL, 3000);
      }
    }
  }
  checkJobRole() {
    if (this.selectedRoleDemands?.length < 3) {
      this.openSnackBar('Please select 3 role demands to continue');
    }
  }

  roleChallengesSelect(button, id, event) {
    if (!this.isAdded) {
      event.preventDefault();
      if (this.selectedRoleDemands.length === 3) {
        if (this.selectedRoleDemands.includes(id)) {
          const index = _.indexOf(this.selectedRoleDemands, id);
          this.selectedRoleDemands.splice(index, 1);
        } else {
          // this.openSnackBar('You can select upto 3 role demands');
        }
        button.checked = false;
      } else {
        if (this.selectedRoleDemands.includes(id)) {
          const index = _.indexOf(this.selectedRoleDemands, id);
          this.selectedRoleDemands.splice(index, 1);
        } else {
          this.selectedRoleDemands.push(id);
        }
      }
    }
  }

  openSnackBar(message, duration: number = 2500) {
    this.snackBar.open(message, 'Ok', {
      duration: duration,
    });
  }
  levelSelect(index) {
    this.selectedLevel = index;
  }

  private initiateStyleSubmittedAnswers(questionList: Array<any> = []) {
    try {
      for (const question of questionList) {
        if (
          Array.isArray(this.styleSubmittedAns) &&
          this.styleSubmittedAns.filter(
            (val) => val.question_id === question.uniqueRefId
          ).length === 0
        ) {
          this.styleSubmittedAns.push({
            answer: 'N/A',
            question_id: question.uniqueRefId,
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
        this.remainingQuestions--;
      }
    }

    const totalAttempted =
      this.alreadyAttemptedCount + this.newlyAttemptedArr.length;

    this.calculatePercentage(totalAttempted, this.totalQuestion);

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
    // this.answerSubmitted = (
    //   (this.progressCount.length * 100) /
    //   this.totalQuestion
    // ).toFixed(2);

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
      if (this.totalAttemptedAnswers < this.questionList.length) {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
          width: '600px',
          data: {
            value: this.totalAttemptedAnswers,
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

              let questions = await this.getQuestions();
              this.loadCounter = 0;
              this.radioselectedcountforperticular = 0;
              this.radioselectionsount.length = 0;
              this.attemptedAnswers = [];
              this.newlyAttemptedArr = [];
              this.questionList = [];

              this.alreadyAttemptedCount = questions['message'].attemptedQuestions;

              /* calculate percentage */
              this.calculatePercentage(
                questions['message'].attemptedQuestions,
                questions['message'].total_question
              );

              this.questionList = questions['message'].questions;
              this.answersList = questions['message'].answers;
              this.isNextPageAvailable = questions['message'].hasNext;
              this.buildQuestionAnswersList();
              this.initiateStyleSubmittedAnswers(this.questionList);
              this.totalQuestion = questions['message'].total_question;
              this.questionCount = 0;
              this.totalPages = questions['message'].total_page;
              this.current_page = questions['message'].current_page;

              document
                .getElementsByClassName('firstQuestion')
                ?.item(0)
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              this.lastPageSubmision();
            }
          }
        });
      } else {
        if (this.isNextPageAvailable) {
          this.loadCounter = 1;

          const submitedAns = await this.saveAnswers();
          this.questionPage++;
          this.answersList = [];

          let questions = await this.getQuestions();
          this.loadCounter = 0;
          this.radioselectedcountforperticular = 0;
          this.radioselectionsount.length = 0;
          this.attemptedAnswers = [];
          this.newlyAttemptedArr = [];
          this.questionList = [];

          this.alreadyAttemptedCount = questions['message'].attemptedQuestions;

          /* calculate percentage */
          this.calculatePercentage(
            questions['message'].attemptedQuestions,
            questions['message'].total_question
          );

          this.questionList = questions['message'].questions;
          this.answersList = questions['message'].answers;
          this.isNextPageAvailable = questions['message'].hasNext;
          this.totalPages = questions['message'].total_page;
          this.current_page = questions['message'].current_page;
          this.buildQuestionAnswersList();
          this.initiateStyleSubmittedAnswers(this.questionList);
          this.questionCount = 0;

          document
            .getElementsByClassName('firstQuestion')
            ?.item(0)
            ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          this.lastPageSubmision();
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
      });
    } catch (error) {
      console.log(error);
    }
  }

  /* on Clicking last page continue button */
   lastPageSubmision() {
    let reqBody = {
      page: this.questionPage,
      attemptedQuestions: this.tempvalue,
      surveyResponse: { answers: this.attemptedAnswers },
    };
    let url =
      this.questionsTitle == 'Strategy'
        ? 'strategiessubmission'
        : 'stylesubmission';

     
    this.loadCounter = 1;
    this.http
      .post(`${environment.baseurl}/sureveyresponse/${url}`, reqBody)
      .subscribe(
        (res: any) => {
          this.loadCounter = 0;
          this.dialogRef.close({ isCancel: false, data: true });
        },
        (err) => {
          this.loadCounter = 0;
          this.dialogRef.close({ isCancel: false, data: true });
          console.log(err);
        }
      );
  }
  /*  GET questions */
  async getQuestions() {
    try {
      this.totalAttemptedAnswers = 0;
      const questions = this.http
        .get(
          `${environment.baseurl}/question/get-questions?type=${this.questionsTitle}&page=${this.questionPage}&limit=10`
        )
        .toPromise();
      return questions;
    } catch (error) {
      console.log(error);
    }
  }

  /* SAVE answers */
  async saveAnswers() {
    try {
      let url =
        this.questionsTitle == 'Strategy' ? 'add-strategy' : 'add-style';

      if (this.attemptedAnswers == 0) {
        //         const tempArr = this.questionList.map((question) => {
        //           return { answer: "N/A", question_id: question.uniqueRefId };
        //         });
        // this.attemptedAnswers = [...tempArr];

        // value going to -
        const tempArr = this.questionList.map((question) => {
          return { answer: 'N/A', question_id: question.uniqueRefId };
        });
        
          this.attemptedAnswers = [...tempArr];
       
          this.tempvalue = this.attemptedAnswers.filter(
            (question) => question.answer == 'N/A'
          ).length;

          if(this.tempvalue == this.tempvalue)
          {
            this.tempvalue = 0;
          }

      } else {
        this.tempvalue = this.attemptedAnswers.filter(
          (question) => question.answer !== 'N/A'
        ).length;
      }
 const reqBody = {
        page: this.questionPage,
        attemptedQuestions: this.tempvalue,
        surveyResponse: { answers: this.attemptedAnswers },
      };
      const submitedAns = await this.http
        .post(`${environment.baseurl}/savedsurveyresponse/${url}`, reqBody)
        .toPromise();
      return submitedAns;
    } catch (error) {
      console.log(error);
    }
  }

  /* Build questions and answers final array */
  buildQuestionAnswersList() {
    const questionList = this.questionList.map((question) => {
      if (!!this.answersList) {
        let answer_obj = this.answersList.find((answer) => {
          if (answer.question_id == question.uniqueRefId) {
            return answer;
          }
        });

        let ans = answer_obj.answer || 'N/A';
        question.answer = ans;

        this.buildAttemptedList(question.answer, question.uniqueRefId);
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
      const tempAnsArr = this.questionList.map((question) => {
        if (question.uniqueRefId === question_id) {
          return { answer: answer, question_id: question.uniqueRefId };
        } else {
          return { answer: 'N/A', question_id: question.uniqueRefId };
        }
      });
      this.attemptedAnswers = [...tempAnsArr];
      // this.attemptedAnswers.push({ "answer": answer, "question_id": question_id })
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

  openResearchPart() {
    this.isMCQSection = false;
    this.researchQuestions = this.fb.group({
      age: [''],
      gender: [''],
      genderOther: [''],
      education: [''],
      country: [''],
      origin: [''],
      culturalGroup: [''],
      culturalGroupOther: [''],
      ethnicalIdentification: [''],
      ethnicalIdentificationOther: [''],
      currentRoleOther: [''],
      currentRole: [''],
    });
    this.currentView = 'RESEARCH_QUESTIONS_1';
  }

  // ----------------------------------- TEMP DATA --------------------------

  getAgeList() {
    return [
      { displayName: '18-29', value: '18-29' },
      { displayName: '30-39', value: '30-39' },
      { displayName: '40-49', value: '40-49' },
      { displayName: '50-59', value: '50-59' },
      { displayName: '60 or older', value: '60 or older' },
    ];
  }

  getGenders() {
    return [
      { displayName: 'Male', value: 'male' },
      { displayName: 'Female', value: 'female' },
     ];
  }

  getEducationLevels() {
    return [
      {
        displayName: 'Less than High School or Secondary School Graduate',
        value: '1',
      },
      {
        displayName:
          'High School or Secondary School Graduate or the Equivalent',
        value: '2',
      },
      { displayName: 'Associate Degree', value: '3' },
      { displayName: 'Bachelor’s Degree', value: '4' },
      { displayName: 'Master’s Degree', value: '5' },
      { displayName: 'Professional Degree', value: '6' },
      { displayName: 'Doctorate Degree', value: '7' },
    ];
  }

  getCountryList() {
    return COUNTRY_LIST;
  }

  getBusinessGroups() {
    return BUSINESS_GROUPS;
  }

  getEhnicalGroups() {
    return ETHNICAL_GROUPS;
  }

  getCulturalGroups() {
    return CULTURAL_GROUPS;
  }

  genderChange(e: any, isOther: boolean = false) {
    if (isOther) {
      this.researchQuestions.get('gender').setValue('');
    } else {
      this.researchQuestions.get('genderOther').setValue('');
    }
  }

  private getResearchQuestionApiPayload(formData: object) {
    try {
      // { answer: 'PM', "question_id": 1141109 },
      const age = formData['age'] ? formData['age'] : formData['ageOther'];
      const cultureGroup = formData['culturalGroup']
        ? formData['culturalGroup']
        : formData['culturalGroupOther'];
      const ethnicalIdentification = formData['ethnicalIdentification']
        ? formData['ethnicalIdentification']
        : formData['ethnicalIdentificationOther'];
      const currentRole = formData['currentRole']
        ? formData['currentRole']
        : formData['currentRoleOther'];

      const data = [
        { answer: formData['country'], question_id: 1141290 },
        { answer: age, question_id: 1141291 },
        { answer: formData['education'], question_id: 1141292 },
        { answer: formData['gender'], question_id: 1141293 },
        { answer: formData['origin'], question_id: 1141294 },
        { answer: cultureGroup, question_id: 1141295 },
        { answer: ethnicalIdentification, question_id: 1141296 },
        { answer: currentRole, question_id: 1141298 },
      ];

      return { surveyResponse: { answers: data } };
    } catch (error) {
      console.log(error);
    }
  }

  async continueResearchQuestions() {
    try {
      if (this.currentView === 'RESEARCH_QUESTIONS_1') {
        this.currentView = 'RESEARCH_QUESTIONS_2';
      } else if (this.currentView === 'RESEARCH_QUESTIONS_2') {
        // this.currentView = undefined;
        const reqData = this.getResearchQuestionApiPayload(
          this.researchQuestions.value
        );
        const url = `${environment.baseurl}/researchquestion/add-response`;
        const saveSurvey = await this.http.post(url, reqData).toPromise();
        // TODO: Once API is functional close dialogue on success only. Else show error.
        if (saveSurvey && saveSurvey['success']) {
          window.location.reload();
          this.openSnackBar(
            SNACKBAR_MESSAGE.SUCCESS_RESEARCH_QUESTION_SAVE,
            3000
          );
          this.dialogRef.close({
            isCancel: false,
            data: this.researchQuestions.value,
            isResearchComplete: true,
          });
        } else {
          this.openSnackBar(SNACKBAR_MESSAGE.FAIL_RESEARCH_QUESTION_SAVE, 3000);
          this.dialogRef.close({
            isCancel: false,
            data: this.researchQuestions.value,
            isResearchComplete: false,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  culturalGroupChange(e: any, isOther: boolean = false) {
    try {
      if (isOther) {
        this.researchQuestions.get('culturalGroup').setValue('');
      } else {
        this.researchQuestions.get('culturalGroupOther').setValue('');
      }
    } catch (error) {
      console.log(error);
    }
  }

  ethnicalIdentificationChange(e: any, isOther: boolean = false) {
    try {
      if (isOther) {
        this.researchQuestions.get('ethnicalIdentification').setValue('');
      } else {
        this.researchQuestions.get('ethnicalIdentificationOther').setValue('');
      }
    } catch (error) {
      console.log(error);
    }
  }

  currentRoleChange(e: any, isOther: boolean = false) {
    try {
      if (isOther) {
        this.researchQuestions.get('currentRole').setValue('');
      } else {
        this.researchQuestions.get('currentRoleOther').setValue('');
      }
    } catch (error) {
      console.log(error);
    }
  }
}
