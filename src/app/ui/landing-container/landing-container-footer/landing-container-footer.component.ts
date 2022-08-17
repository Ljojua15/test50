import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { switchMap } from 'rxjs';
import { Rule } from 'src/app/shared/models/rule';

@Component({
  selector: 'crc-landing-container-footer',
  templateUrl: './landing-container-footer.component.html',
  styleUrls: ['./landing-container-footer.component.scss'],
})
export class LandingContainerFooterComponent implements OnInit {
  rules: Rule[] = [];
  additionalRules: Rule | null = null;

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.getRules();
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
