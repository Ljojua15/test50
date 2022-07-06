import { map, Observable, timer, takeWhile } from 'rxjs';

export const countdown$ = (
  toDate: Date
): Observable<{ hours: number; minutes: number; seconds: number }> => {
  // const startDate = new Date();
  // const diff = toDate.getTime() - startDate.getTime();

  // less than 24 hours
  // if (diff < 24 * 60 * 60 * 1000) {
  return timer(0, 1000).pipe(
    // get difference between dates
    map(() => toDate.getTime() - new Date().getTime()),
    takeWhile((x: any) => x >= 0),
    // format countdown to H,M,S
    map((x: number) => {
      const hours = Math.floor(x / (60 * 60 * 1000));
      const minutes = Math.floor((x - hours * 60 * 60 * 1000) / (60 * 1000));
      const seconds = Math.floor(
        (x - hours * 60 * 60 * 1000 - minutes * 60 * 1000) / 1000
      );

      // console.log(x);

      return {
        hours,
        minutes,
        seconds,
      };
    })
  );
};
