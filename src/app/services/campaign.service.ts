import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../models/response';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  readonly API = environment.cmsApi;

  constructor(private http: HttpClient) {}

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
    return this.http.get(`https://cms.crocobet.com/twitch?category=test-live`);
  }

  getButtonStatus(url: string) {
    return this.http.get(url);
  }

  getPrize(campaignId: string): Observable<any> {
    return this.http.post<any>(`${this.API}${campaignId}`, {});
  }
}
