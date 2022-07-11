import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LatencyTestService {
  arrTimes: number[] = [];
  i = 0; // start
  timesToTest = 5;
  tThreshold = 150; //ms
  testImage = 'http://www.google.com/images/phd/px.gif'; // small image in your server
  dummyImage = new Image();
  isConnectedFast = false;

  constructor() {}
  connection = (navigator as any).connection;

  isSlowConnection(): boolean {
    if (this.connection) {
      const type = this.connection.effectiveType;
      return type === 'slow-2g' || type === '2g' || type === '3g';
    }
    return true;
  }
}
