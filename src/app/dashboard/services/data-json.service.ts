import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataJSONService {



  priorities: any = ['Lead Innovatio', 'Develop & Empower talent', 'Manage Complexity']
  currentSprintsSlides: any = [
    {
      title: "Actions",
      data: [],
      activeIndex: 0
    },
    {
      title: "Behaviours",
      data: [],
      activeIndex: 0
    },
    {
      title: "Outcome",
      data: [],
      activeIndex: 0
    },

  ]

  // myportfolioSlides: any = [
  //   {
  //     title: "Actions",
  //     data: [
  //       {
  //         subTitle: 'Implement',
  //         data: '1. 10 Dec 2020, 12 Weeks',
  //       },
  //       {
  //         subTitle: 'Implement',
  //         data: '2. 10 Dec 2020, 12 Weeks',
  //       },
  //       {
  //         subTitle: 'Implement',
  //         data: '3. 10 Dec 2020, 12 Weeks',
  //       },
  //       {
  //         subTitle: 'Implement',
  //         data: '4. 10 Dec 2020, 12 Weeks',
  //       },
  //     ],
  //     activeIndex: 0
  //   },]


  myportfolioSlides: any = [
    {
      title: "Actions",
      data: [],
      activeIndex: 0
    },]


  getPalnAPiResponse: any = {
    "success": true,
    "status": 200,
    "message": {
      "assessment": {
        "id": 122,
        "version": "1.0",
        "surveyPlatform": "RapidX",
        "surveyPlatformMeta": "RF",
        "clientId": 3,
        "userId": 108,
        "isActive": true,
        "triggerId": 95,
        "createdAt": "2021-01-27T06:52:14.00Z",
        "updatedAt": "2021-01-27T06:52:14.00Z"
      },
      "fad": [
        {
          "id": 1229,
          "capabilityId": 9,
          "assessmentId": 122,
          "status": false,
          "isPriority": true,
          "createdAt": "2021-02-08T13:50:49.00Z",
          "updatedAt": "2021-02-08T13:51:34.00Z"
        },
        {
          "id": 1230,
          "capabilityId": 6,
          "assessmentId": 122,
          "status": false,
          "isPriority": true,
          "createdAt": "2021-02-08T13:50:49.00Z",
          "updatedAt": "2021-02-09T23:30:41.00Z"
        },
        {
          "id": 1231,
          "capabilityId": 7,
          "assessmentId": 122,
          "status": false,
          "isPriority": true,
          "createdAt": "2021-02-08T13:50:49.00Z",
          "updatedAt": "2021-02-17T05:03:08.00Z"
        }
      ],
      "priority": 9,
      "capability": [
        {
          "id": 6,
          "uuid": "531bc1d5-019d-4b28-a5dd-907ee8c5a8f7",
          "label": "Build Stakeholder Relationships",
          "icon": "cap_6",
          "colour": "#fff",
          "capabilityType": "Energize",
          "description": "Builds strong alignment and connections with a broad network of stakeholders up, down and across the organisation. Uses this influence to impact the broader organisation.",
          "createdAt": "2020-09-21T12:34:27.00Z",
          "updatedAt": "2020-11-05T22:30:26.00Z"
        },
        {
          "id": 7,
          "uuid": "7c149ca6-03c0-454d-8aed-5748f4ff9bda",
          "label": "Develop Growth Mindset",
          "icon": "cap_7",
          "colour": "#fff",
          "capabilityType": "Transform",
          "description": "Continually pushes the organisation to grow while building capabilities needed to\nachieve this growth. Experiments with multiple opportunities and learns from failure.",
          "createdAt": "2020-09-21T12:34:38.00Z",
          "updatedAt": "2020-10-28T21:14:29.00Z"
        },
        {
          "id": 9,
          "uuid": "694ebfe5-f91d-4b63-9815-fd3b1343de9b",
          "label": "Shape External Focus & Alignment",
          "icon": "cap_9",
          "colour": "#fff",
          "capabilityType": "Transform",
          "description": "Obsessively connects the organisation into the environment. Has strong and wide\nexternal network that provides information to guide strategy and innovation.",
          "createdAt": "2020-09-21T12:34:38.00Z",
          "updatedAt": "2020-10-28T21:14:30.00Z"
        }
      ],
      "userSprint": {
        "id": 593,
        "userId": 108,
        "datetimeFrom": "2021-02-11T18:30:00.00Z",
        "datetimeTo": "2021-03-10T18:30:00.00Z",
        "assessmentId": 122,
        "sprintId": 71,
        "isCustom": false,
        "frequency": 7,
        "weeklyCheckInFrom": "2021-02-12T03:30:00.00Z",
        "weeklyCheckInTo": "2021-02-12T04:00:00.00Z",
        "duration": 4,
        "isActive": true,
        "isStop": false,
        "isFinished": false,
        "isPortfolio": false,
        "createdAt": "2021-02-08T13:51:52.00Z",
        "updatedAt": "2021-02-08T13:53:45.00Z"
      },
      "sprint": {
        "id": 71,
        "capabilityId": 9,
        "label": "Market Trends",
        "description": "Identify market, competitor and technology trends and share these internally",
        "defaultLength": 8,
        "recommended": true,
        "ic": true,
        "pm": true,
        "mm": true,
        "bu": true,
        "ceo": false,
        "manualId": 701,
        "isActive": true,
        "manualDeactivate": false,
        "inconsistent": false,
        "sortIndex": 1,
        "createdAt": "2021-01-11T06:00:12.00Z",
        "updatedAt": "2021-01-11T06:02:04.00Z"
      },
      "selectedAction": [
        {
          "id": 187,
          "actionId": 531,
          "assessmentId": 122,
          "status": false,
          "selectedSprintId": 71,
          "isCustom": false,
          "createdAt": "2021-02-08T13:52:23.00Z",
          "updatedAt": "2021-02-08T13:52:23.00Z"
        }
      ],
      "action": [
        {
          "id": 531,
          "sprintId": 71,
          "label": "Network: Peers",
          "description": "Network: Discuss trends with peers in other companies or industries",
          "recommended": false,
          "isActive": true,
          "manualDeactivate": false,
          "inconsistent": false,
          "sortIndex": 7,
          "manualId": 499,
          "manualSprintId": 701,
          "createdAt": "2021-01-11T06:00:35.00Z",
          "updatedAt": "2021-01-11T06:00:35.00Z"
        }
      ],
      "customAction": [

      ],
      "selectedBehaviour": [
        {
          "id": 109,
          "behaviourId": 527,
          "assessmentId": 122,
          "status": false,
          "selectedSprintId": 71,
          "isCustom": false,
          "createdAt": "2021-02-08T13:52:27.00Z",
          "updatedAt": "2021-02-08T13:52:27.00Z"
        }
      ],
      "behaviour": [
        {
          "id": 527,
          "sprintId": 71,
          "label": "Outside In Thinking",
          "theme1": "Change Leader",
          "description": "Regularly introduce ideas from outside the team or business to trigger new ideas or ways of thinking",
          "recommended": false,
          "isActive": true,
          "manualDeactivate": false,
          "inconsistent": false,
          "sortIndex": 1,
          "manualId": 449,
          "manualSprintId": 701,
          "createdAt": "2021-01-11T06:01:31.00Z",
          "updatedAt": "2021-01-11T06:01:31.00Z"
        }
      ],
      "customBehaviour": [

      ],
      "selectedOutcome": [
        {
          "id": 80,
          "outcomeId": 131,
          "assessmentId": 122,
          "status": false,
          "selectedSprintId": 71,
          "isCustom": false,
          "createdAt": "2021-02-08T13:52:29.00Z",
          "updatedAt": "2021-02-08T13:52:29.00Z"
        }
      ],
      "outcome": [
        {
          "id": 131,
          "sprintId": 71,
          "label": "Collaboration",
          "theme1": "Observable",
          "description": "Improved collaboration across functions",
          "recommended": false,
          "isActive": true,
          "manualDeactivate": false,
          "inconsistent": false,
          "sortIndex": 1,
          "manualId": 201,
          "manualSprintId": 701,
          "createdAt": "2021-01-11T06:01:56.00Z",
          "updatedAt": "2021-01-11T06:01:56.00Z"
        }
      ],
      "customOutcome": [

      ],
      "crew": [
        {
          "id": 585,
          "userId": 108,
          "clientId": 3,
          "userSprintId": 593,
          "name": "TEST",
          "email": "myaddress123@yopmail.com",
          "isManager": false,
          "isMentor": false,
          "isPeerOthers": false,
          "isTeam": true,
          "isCustomer": false,
          "isCoach": false,
          "isOther": false,
          "isDirectReport": false,
          "isFastForward": true,
          "isFeedbackGoalsNBehaviour": true,
          "isAccessGivenReport": false,
          "isAccessGivenPortfolio": false,
          "isAccessGivenDevelopmentDashboard": true,
          "isAccept": false,
          "createdAt": "2021-02-08T13:53:23.00Z",
          "updatedAt": "2021-02-08T13:53:23.00Z"
        }
      ],
      "capabilityRank": [
        {
          "capability": {
            "id": 6,
            "uuid": "531bc1d5-019d-4b28-a5dd-907ee8c5a8f7",
            "label": "Build Stakeholder Relationships",
            "icon": "cap_6",
            "colour": "#fff",
            "capabilityType": "Energize",
            "description": "Builds strong alignment and connections with a broad network of stakeholders up, down and across the organisation. Uses this influence to impact the broader organisation.",
            "createdAt": "2020-09-21T12:34:27.00Z",
            "updatedAt": "2020-11-05T22:30:26.00Z"
          },
          "rank": 1,
          "isRecommended": false,
          "style": 4,
          "strategy": 4
        },
        {
          "capability": {
            "id": 9,
            "uuid": "694ebfe5-f91d-4b63-9815-fd3b1343de9b",
            "label": "Shape External Focus & Alignment",
            "icon": "cap_9",
            "colour": "#fff",
            "capabilityType": "Transform",
            "description": "Obsessively connects the organisation into the environment. Has strong and wide\nexternal network that provides information to guide strategy and innovation.",
            "createdAt": "2020-09-21T12:34:38.00Z",
            "updatedAt": "2020-10-28T21:14:30.00Z"
          },
          "rank": 3,
          "isRecommended": true,
          "style": 2,
          "strategy": 5
        },
        {
          "capability": {
            "id": 8,
            "uuid": "bb2313a5-6a04-4e8b-a659-813b1c397101",
            "label": "Lead Innovation",
            "icon": "cap_8",
            "colour": "#fff",
            "capabilityType": "Transform",
            "description": "Grows the organisation by exploiting current products and services by exploring new\nopportunities. Builds a culture of innovation.",
            "createdAt": "2020-09-21T12:34:38.00Z",
            "updatedAt": "2020-10-28T21:14:30.00Z"
          },
          "rank": 2,
          "isRecommended": false,
          "style": 3,
          "strategy": 4
        }
      ],
      "sprintNo": 1
    }
  }
  constructor() { }
}
