import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { getCookie } from '../utils';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  public getToken(): string | undefined {
    if (!environment.production) {
      return environment.testToken;
    }

    return getCookie('X-ODDS-SESSION');
  }

  // public isAuthorized(): boolean {
  //   return !!this.getToken();
  // }

  public isAuthorized(): Observable<boolean> {
    return this.route.queryParams.pipe(map((res) => !!res['tk']));
  }

  public getVerificationStatus(): Observable<boolean> {
    return this.http
      .get(`https://customers01.crocobet.com/customers/personal-data`)
      .pipe(
        catchError((_) => of(false)),
        map((res: any) => !!res),
        tap((res) => console.log(res))
      );
  }
}
