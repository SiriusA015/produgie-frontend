import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() { }

  public static calculateDayDiffFromUTC(dateFrom: string, dateTo: string) {
    return Math.abs(
      moment(new Date(moment(dateTo).format('YYYY-MM-DD').replace(/-/g, '/').replace('T', ' ') + ' 00:00').toISOString()).diff(
        moment(new Date(moment(dateFrom).format('YYYY-MM-DD').replace(/-/g, '/').replace('T', ' ') + ' 00:00').toISOString()),
        'days'
      )
    );
  }
  // public static calculateDayDiffFromUTCnonAbs(dateFrom: string, dateTo: string) {
  //   console.log(dateFrom,'gjkdhgd')
  //   return moment(new Date(moment(dateTo).format('YYYY-MM-DD') + ' 00:00').toISOString()).diff(
  //       moment(new Date(moment(dateFrom).format('YYYY-MM-DD') + ' 00:00').toISOString()),
  //       'days'
  //     );

  //   // return moment(data.d.results[0].Updated_On, "MM-Do-YYYY").format('MMMM Do YYYY'))
  // }
  public static calculateDayDiffFromUTCnonAbs(dateFrom: string, dateTo: string) {
    return moment(new Date((dateTo))).diff(
      moment(new Date((dateFrom))),
      'days'
    );
  }
  public static calculateSecDiffFromUTCnonAbs(dateFrom: string, dateTo: string) {
    console.log("function called")
    
    var a = moment(new Date(dateTo));//now
    var b = moment(dateFrom);
    console.log(dateFrom)
    console.log(b)
    console.log(dateTo)
    console.log(a)
    
    return a.diff(b, 'milliseconds');
  }

  public static calculateSprintDay(dateFrom: string, dateTo: string) {
    return moment(
      new Date(moment(dateFrom).format('YYYY-MM-DD').replace(/-/g, '/').replace('T', ' ') + ' 00:00').toISOString()
    ).diff(
      moment(new Date(moment(dateTo).format('YYYY-MM-DD').replace(/-/g, '/').replace('T', ' ') + ' 00:00').toISOString()),
      'days'
    );
  }
  public static getDateTime(date: string, time: string) {

    // date = new Date(date).toLocaleString("en-US", {timeZone: "Asia/Kolkata"});

    return moment(
      moment(new Date(date)).format('YYYY-MM-DD') + ' ' + time,
      'YYYY-MM-DD hh:mm A'
    );
  }
}
