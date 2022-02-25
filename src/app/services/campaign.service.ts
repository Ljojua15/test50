import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GenericResponse} from "../models/response";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  readonly API = environment.cmsApi;

  constructor(private http: HttpClient) { }

  getUserData(campaignId: string): Observable<GenericResponse<User>> {
    return this.http.get<GenericResponse<User>>(
      `${this.API}${campaignId}`
    )
  }

}
