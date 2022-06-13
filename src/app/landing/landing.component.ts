import { Component, OnInit } from '@angular/core';
import { Rule } from '../models/rule';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  title: {
    en: string;
    ge: string;
    ru: string;
  } | null = null;
  rules: Rule[] = [];
  additionalRules: Rule | null = null;
  lang: 'en' | 'ge' | 'ru' = 'ge';

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.lang = this.getCurrentLang();
    this.getRules();
  }

  getCurrentLang() {
    return this.translateService.currentLang === 'en'
      ? 'en'
      : this.translateService.currentLang === 'ru'
      ? 'ru'
      : 'ge';
  }

  getRules() {
    this.translateService.onLangChange
      .pipe(
        switchMap((language: any) => {
          const lang = language.lang === 'ge' ? 'ka' : language.lang;
          return this.campaignService.getRules(lang);
        })
      )
      .subscribe((res: any) => {
        this.rules = res.data;
        this.additionalRules = this.rules.splice(this.rules.length - 1, 1)[0];
      });
  }
}
