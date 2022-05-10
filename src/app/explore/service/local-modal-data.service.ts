import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalModalDataService {
  constructor() {}

  styleInfoPageData: any = {
    data: `This questionnaire asks how strongly you agree with a series of statements. There are no right or wrong answers, and your initial response is usually the most accurate. Try to answer every question as your responses will be summarised to create your report. 
    Important! There are 2 sections: Styles and Strategies. Each will take about 20 minutes to complete. Your answers are saved as you go so that you can exit the survey and return to complete it later. 
    Please note: 
    'Customers' refer to external customers/clients/partners. If you do not manage external customers. please respond to these questions with your 'internal customers' in mind 
    • 'Stakeholders' refer to internal or external groups (e.g., other leaders, suppliers, investors, etc.) that can affect or be affected by you or your team 
    If you have questions, please contact produgie.support@produgie.com 
    `,
  };

  mcqQuestionList: any = [
    // {
    //   questionId: 'q1',
    //   question: "I regularly hold meetings across departments to discuss market trends (e.g., customers, competition, suppliers) in order to drive internal priorities"
    // },
    {
      questionId: 'q2',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q3',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q4',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q5',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q6',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q7',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q8',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q9',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q10',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q11',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q12',
      question: 'I am entitked to more respect than the average person',
    },
    {
      questionId: 'q13',
      question: 'I am entitked to more respect than the average person',
    },
  ];

  // roleResponse = {
  //   "success": true,
  //   "status": 200,
  //   "message": [
  //     {
  //       "role": "Individual Contributor",
  //       "role_code": "IN",
  //       "description": "Manage projects or virtual teams, but no direct people management responsibilities (e.g., hiring, salaries, etc.)"
  //     },
  //     {
  //       "role": "People Manager",
  //       "role_code": "PM",
  //       "description": "Manage a team (e.g., hiring, salaries, bonus, etc.)"
  //     },
  //     {
  //       "role": "Manager Of Managers",
  //       "role_code": "MM",
  //       "description": "Manage through at lease one layer of people managers (e.g., managing two layers of employees)"
  //     },
  //     {
  //       "role": "Function/Business Unit Manager",
  //       "role_code": "BU",
  //       "description": "Manage through at least two layers of people managers and lead an entire function (e.g., all of HR, Legal, IT, Finance) or a Business Unit (e.g., full P&L responsibility for a country of segment)"
  //     }
  //   ]
  // }
}
