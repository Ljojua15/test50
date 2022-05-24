import { Component, OnInit } from '@angular/core';
import { Rule } from '../models/rule';
import { RulesService } from '../services/rules.service';
import { TranslateService } from '@ngx-translate/core';
import { IframeService } from '../services/iframe.service';
import { CampaignService } from '../services/campaign.service';
import { GenericResponse } from '../models/response';
import { User } from '../models/user';
import { forkJoin, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  wheelType: 'silver' | 'gold' | 'platinum' = 'silver';
  amount = 5000;
  disableDiv = false;
  isAuthorized = false;

  userData = {
    progress: 0,
    available: 0,
    usedSilver: 0,
    usedGold: 0,
    usedPlatinum: 0,
  };

  title: {
    en: string;
    ge: string;
    ru: string;
  } | null = null;
  rules: Rule[] = [];
  additionalRules: Rule | null = null;
  lang: 'en' | 'ge' | 'ru' = 'ge';

  constructor(
    private rulesService: RulesService,
    private translateService: TranslateService,
    private iframeService: IframeService,
    private campaignService: CampaignService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.lang = this.getCurrentLang();
    this.title = this.rulesService.getTitle();
    this.rules = this.rulesService.getRules();
    this.additionalRules = this.rulesService.getAdditionRules();
    this.getUserData();
    this.checkAuthorized();
  }

  getUserData() {
    return this.campaignService
      .getUserData('/campaigns/slot-vip-wheel-030622/user')
      .pipe(map((res) => res.data.state))
      .subscribe((res) => {
        this.userData = {
          progress: Math.min(res.progress, 20000),
          available: res.available,
          usedSilver: res.groupDetails.i.pointsUsed,
          usedGold: res.groupDetails.ii.pointsUsed,
          usedPlatinum: res.groupDetails.iii.pointsUsed,
        };
        console.log(this.userData);
        console.log(res);
      });

    // return forkJoin([
    //   this.campaignService
    //     .getUserData('slot-vip-wheel-030622')
    //     .pipe(map((res: GenericResponse<User>) => res.data)),
    //   this.campaignService
    //     .getUserData('slot-vip-wheel-030622')
    //     .pipe(map((res: GenericResponse<User>) => res.data)),
    //   this.campaignService
    //     .getUserData('slot-vip-wheel-030622')
    //     .pipe(map((res: GenericResponse<User>) => res.data)),
    // ]).subscribe((state) => {
    //   console.log(state);
    // });
  }

  getType(type: 'silver' | 'gold' | 'platinum') {
    this.wheelType = type;

    type === 'silver'
      ? (this.amount = 5000)
      : type === 'gold'
      ? (this.amount = 10000)
      : (this.amount = 20000);
  }

  getState(state: boolean) {
    this.disableDiv = state;
  }

  getCurrentLang() {
    return this.translateService.currentLang === 'en'
      ? 'en'
      : this.translateService.currentLang === 'ru'
      ? 'ru'
      : 'ge';
  }

  onRegister() {
    this.iframeService.register();
  }

  onLogin() {
    this.iframeService.login();
  }

  checkAuthorized() {
    this.isAuthorized = this.authService.isAuthorized();
  }
}
