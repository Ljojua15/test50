import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { GenericResponse } from '../shared/models/response';
import { IframeResponse, User } from '../shared/models/user';
import { Rule } from '../shared/models/rule';
import { Prize } from '../shared/models/prize';
import { Promo } from '../shared/models/promo';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  readonly API = environment.cmsApi;

  readonly rulesKey = 'ufocashbackwheel';
  readonly campaignId = 'bonus-space-v2';

  public updateUserData = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getUserData(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/user/state`
    );
  }

  getBalance(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/user`
    );
  }

  getLeaderBoard(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/user/leaderboard`
    );
  }

  getPrize(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<Prize>> {
    return this.http.post<GenericResponse<Prize>>(
      `${this.API}/campaigns/${campaignId}/get-prize`,
      {}
    );
  }

  getHistory<TObj>(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<TObj>> {
    return this.http.get<GenericResponse<TObj>>(
      `${this.API}/campaigns/${campaignId}/history`
    );
  }

  getRules(lang: string): Observable<GenericResponse<Array<Rule>>> {
    return this.http.get<GenericResponse<Array<Rule>>>(
      environment.rulesApi(lang) + this.rulesKey
    );
  }

  cashout(
    campaignId: string,
    exchangeId: string
  ): Observable<GenericResponse<{ success: boolean }>> {
    return this.http.post<GenericResponse<{ success: boolean }>>(
      `${this.API}/campaigns/${campaignId}/cashout`,
      {
        exchangeId,
      }
    );
  }

  getBanners(lang: string, campaignId: string): Observable<{ data: Promo[] }> {
    return this.http.get<{ data: Promo[] }>(
      `${this.API}/banners?platform=desktop&type=landing&lang=${lang}&campaignId=${campaignId}`
    );
  }

  getGameUrl(lang: string): Observable<IframeResponse> {
    // console.log(lang, 'laang')
    return this.http
      .post<GenericResponse<IframeResponse>>(
        `${this.API}/campaigns/${this.campaignId}/user/session?lang=${lang}`,
        {}
      )
      .pipe(
        map((res: GenericResponse<IframeResponse>) => {
          return res.data;
        })
      );
  }

  getCursomUrl(url: string) {
    return this.http.get(url);
  }
}
