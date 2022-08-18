import { Component, OnInit } from '@angular/core';
import { Rule } from '../shared/models/rule';
import { RulesService } from '../services/rules.service';
import { TranslateService } from '@ngx-translate/core';

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
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.lang = this.getCurrentLang();
    this.title = this.rulesService.getTitle();
  }

  getCurrentLang() {
    return this.translateService.currentLang === 'en'
      ? 'en'
      : this.translateService.currentLang === 'ru'
      ? 'ru'
      : 'ge';
  }
}
