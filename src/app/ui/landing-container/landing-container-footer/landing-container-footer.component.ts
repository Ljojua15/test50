import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Rule } from 'src/app/shared/models/rule';
import { GenericResponse } from 'src/app/shared/models/response';

@Component({
  selector: 'crc-landing-container-footer',
  templateUrl: './landing-container-footer.component.html',
  styleUrls: ['./landing-container-footer.component.scss'],
})
export class LandingContainerFooterComponent {
  rules$: Observable<{ mainRules: Rule[]; additionalRule: Rule }> =
    this.translateService.onLangChange.pipe(
      switchMap((language: any) => {
        const lang = language.lang === 'ge' ? 'ka' : language.lang;
        return this.campaignService.getRules(lang);
      }),
      tap(console.log),
      map((res: GenericResponse<[]>) => {
        const slicedItem = res.data.splice(-1);
        console.log(slicedItem);
        return {
          mainRules: res.data,
          additionalRule: slicedItem[0],
        };
      })
    );

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService
  ) {}
}
