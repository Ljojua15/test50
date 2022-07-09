import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { GenericResponse } from '../models/response';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  readonly API = environment.cmsApi;

  readonly landing = 'summerraffle';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUserData(campaignId: string): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}`
    );
  }

  getFinalData(campaignId: string): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}`
    );
  }

  getSchedule(eventId: string): Observable<any> {
    return this.http.get(`https://cms.crocobet.com/twitch/get/${eventId}`);
  }

  getLiveStreams(): Observable<any> {
    return this.http.get(
      `https://cms.crocobet.com/twitch?category=summer-live-raffle`
    );
  }

  getButtonStatus(url: string) {
    return this.http.get(url);
  }

  getPrize(campaignId: string): Observable<any> {
    return this.http.post<any>(`${this.API}${campaignId}`, {});
  }

  getRules(lang: string): Observable<any> {
    return this.http.get<any>(environment.rulesApi(lang) + this.landing);
  }

  getActive(campaignId: string) {
    return this.http
      .get(`https://cms.crocobet.com/campaigns/${campaignId}/quizzes`, {
        params: {
          active: 'true',
        },
      })
      .pipe(
        map((res: any) => {
          if (res?.data?.active) {
            return res.data.active.id;
          } else {
            return 0;
          }
        })
      );
  }

  submitAnswer(campaignId: string, questionId: string, answer: string) {
    if (!this.authService.isAuthorized()) {
      return throwError(() => new Error('Not Authorized'));
    }
    return this.http.post(
      `https://cms.crocobet.com/campaigns/${campaignId}/quizzes/${questionId}/submit`,
      {answer: ''}
    );
  }
}
