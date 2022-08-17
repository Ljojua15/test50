import { Component, OnInit } from '@angular/core';
import { Rule } from '../shared/models/rule';
import { RulesService } from '../services/rules.service';
import { TranslateService } from '@ngx-translate/core';
import { CampaignService } from '../services/campaign.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'crc-landing',
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
    private rulesService: RulesService,
    private translateService: TranslateService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.lang = this.getCurrentLang();
    this.title = this.rulesService.getTitle();
    // this.rules = this.rulesService.getRules();
    // this.additionalRules = this.rulesService.getAdditionRules();
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
