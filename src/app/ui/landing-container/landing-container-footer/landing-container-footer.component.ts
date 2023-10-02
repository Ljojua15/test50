import { Component, inject } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { Observable, map, switchMap } from 'rxjs';
import { Rule } from 'src/app/shared/models/rule';
import { GenericResponse } from 'src/app/shared/models/response';
import { whichAction } from './booster';

@Component({
  selector: 'crc-landing-container-footer',
  templateUrl: './landing-container-footer.component.html',
  styles: [':host { margin: 100px 0; }'],
})
export class LandingContainerFooterComponent {
  private readonly translateService = inject(TranslateService);
  private readonly campaignService = inject(CampaignService);

  rules$: Observable<{ mainRules: Rule[]; additionalRule: Rule }> =
    this.translateService.onLangChange.pipe(
      switchMap((language: LangChangeEvent) => {
        const lang = language.lang === 'ge' ? 'ka' : language.lang;
        const boosterKey = whichAction('rules');
        return this.campaignService.getRules(lang, boosterKey as string);
      }),
      map((rules: GenericResponse<Array<Rule>>) => {
        const additionalRule = rules.data.splice(-1)[0];
        return {
          mainRules: rules.data,
          additionalRule: additionalRule,
        };
      })
    );
}
