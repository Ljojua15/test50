import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { GenericResponse } from '../shared/models/response';
import { User } from '../shared/models/user';
import { CashOut } from '../shared/models/cashout';
import { CongratPopupData } from '../shared/models/congratPopupData';
import { Rule } from '../shared/models/rule';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  readonly API = environment.cmsApi;

  readonly rulesKey = 'ufocashbackwheel';
  readonly campaignId = 'ufocashbackwheel';

  //live
  readonly liveId = 'new-year-raffle';
  readonly buttonStatusId = 'live-tv-drawing-181122';
  readonly buttonSubmitId = 'live-tv-drawing-211222-v2';

  public updateUserData = new Subject<boolean>();
  constructor(private http: HttpClient) {}

  getUserData(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/user`
    );
  }

  getPrize(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<User>> {
    return this.http.post<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/get-prize`,
      {}
    );
  }

  getHistory(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/history`
    );
  }

  getRules(lang: string): Observable<GenericResponse<Array<Rule>>> {
    return this.http.get<GenericResponse<Array<Rule>>>(
      environment.rulesApi(lang) + this.rulesKey
    );
  }

  getBanners(): Observable<any> {
    return this.http.get<any>(
      `${this.API}/banners?platform=desktop&type=landing`
    );
  }

  getLiveUrl(): Observable<any> {
    return this.http.get(`https://cms.crocobet.com/twitch/get/live`);
  }

  getLiveStreams(liveId: string = this.liveId): Observable<any> {
    return this.http.get(`https://cms.crocobet.com/twitch?category=${liveId}`);
  }

  getTicketStatus(questionId: string, buttonId: string = this.buttonStatusId) {
    return this.http.get(
      `https://cms.crocobet.com/campaigns/${buttonId}/quizzes/${questionId}/status`
    );
  }

  submitAnswer(questionId: string, buttonId: string = this.buttonSubmitId) {
    return this.http.post(
      `https://cms.crocobet.com/campaigns/${buttonId}/quizzes/${questionId}/submit`,
      { answer: '' }
    );
  }

  getActiveButton(campaignId: string = this.campaignId) {
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

  cashout(campaignId: string, exchangeId: string): Observable<any> {
    return this.http.post<any>(`${this.API}/campaigns/${campaignId}/cashout`, {
      exchangeId,
    });
  }
}
