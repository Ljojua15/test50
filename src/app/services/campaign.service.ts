import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GenericResponse } from '../shared/models/response';
import { User } from '../shared/models/user';
import { Rule } from '../shared/models/rule';
import { Prize } from '../shared/models/prize';
import { Promo } from '../shared/models/promo';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  readonly API = environment.cmsApi;

  readonly rulesKey = 'plinko-wheel-100523';
  readonly campaignId = 'plinko-wheel-100523';

  public updateUserData = new Subject<boolean>();

  private available = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  getUserData(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/user`
    );
  }

  updateValue(newValue: any) {
    console.log('new', newValue);
    this.available.next(newValue);
    console.log('up', this.available);
  }

  getValue(): any {
    return this.available.value;
  }

  getPrize(
    campaignId: string = this.campaignId
  ): Observable<GenericResponse<Prize>> {
    return this.http.post<GenericResponse<Prize>>(
      `${this.API}/campaigns/${campaignId}/get-prize`,
      // https://cms.crocobet.com/campaigns/plinko-wheel-100523/get-prize
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
}
