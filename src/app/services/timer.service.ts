import { Injectable } from '@angular/core';
import { map, Observable, takeWhile, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  schedule: string[] = [
    'Jan 24 2023 22:00:00 GMT+0400',
    'Jan 31 2023 22:00:00 GMT+0400',
    'Feb 7 2023 22:00:00 GMT+0400',
    'Feb 14 2023 22:00:00 GMT+0400',
  ];

  constructor() {}

  checkLastLive() {
    let oneHours = 3600000;
    let twoHours = 7200000;
    let theeHours = 10800000;

    let currentDate = new Date();
    let lastLiveIndex =
      this.schedule.findIndex((date) => currentDate < new Date(date)) - 1;
    let passedMilliseconds =
      currentDate.getTime() - new Date(this.schedule[lastLiveIndex]).getTime();

    // return passedMilliseconds < twoHours ? passedMilliseconds : false;
    return passedMilliseconds < twoHours;
  }

  countdown$(): Observable<{
    hours: number;
    minutes: number;
    seconds: number;
  }> {
    let today = new Date();
    let toDate = this.schedule.find((date) => today < new Date(date));

    return timer(0, 1000).pipe(
      // get difference between dates
      map(() => new Date(toDate!).getTime() - new Date().getTime()),
      takeWhile((x: any) => x >= 0),
      // format countdown to H,M,S
      map((x: number) => {
        const hours = Math.floor(x / (60 * 60 * 1000));
        const minutes = Math.floor((x - hours * 60 * 60 * 1000) / (60 * 1000));
        const seconds = Math.floor(
          (x - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000
        );
        return {
          hours,
          minutes,
          seconds,
        };
      })
    );
  }
}
