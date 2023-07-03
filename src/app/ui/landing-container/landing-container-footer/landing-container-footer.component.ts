import { Component, inject } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { Observable, map, switchMap } from 'rxjs';
import { Rule } from 'src/app/shared/models/rule';
import { GenericResponse } from 'src/app/shared/models/response';

@Component({
  selector: 'crc-landing-container-footer',
  templateUrl: './landing-container-footer.component.html',
  styleUrls: ['./landing-container-footer.component.scss'],
})
export class LandingContainerFooterComponent {
  private readonly translateService = inject(TranslateService);
  private readonly campaignService = inject(CampaignService);

  rules$: Observable<{ mainRules: Rule[]; additionalRule: Rule }> =
    this.translateService.onLangChange.pipe(
      switchMap((language: LangChangeEvent) => {
        const lang = language.lang === 'ge' ? 'ka' : language.lang;
        return this.campaignService.getRules(lang);
      }),
      map((rules: GenericResponse<Array<Rule>>) => {
        const additionalRule = rules.data.splice(-1);
        return {
          mainRules: rules.data,
          additionalRule: additionalRule[0],
        };
      })
    );
}
