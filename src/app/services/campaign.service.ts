import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericResponse } from '../shared/models/response';
import { User } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class CampaignService {
  readonly API = environment.cmsApi;

  readonly rulesKey = 'ufocashbackwheel';

  constructor(private http: HttpClient) {}

  getUserData(campaignId: string): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/user`
    );
  }

  getPrize(campaignId: string): Observable<GenericResponse<User>> {
    return this.http.post<GenericResponse<User>>(
      `${this.API}/campaigns/${campaignId}/get-prize`,
      {}
    );
  }

  getRules(lang: string): Observable<any> {
    return this.http.get<any>(environment.rulesApi(lang) + this.rulesKey);
  }
}
