import { Component } from '@angular/core';
import {CampaignService} from "../../../../services/campaign.service";
import {map, Observable, switchMap} from "rxjs";
import {Promo} from "../../../../shared/models/promo";
import {TranslateService} from "@ngx-translate/core";
import {LanguageCode} from "../../../../shared/enums/lang";

@Component({
  selector: 'crc-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent {
  promos$ :Observable<Promo[]>
  constructor(private campaignService : CampaignService,private translateService: TranslateService
  ) {
    this.promos$ =  this.translateService.onLangChange.pipe(
      switchMap((res )=>{
        const lang = LanguageCode[res.lang as keyof typeof LanguageCode]
        return this.campaignService.getBanners(LanguageCode[res.lang as keyof typeof LanguageCode],'bonus-balance-progress-v2')
      }),
      map((res)=>{
        return res.data
      })
    )
  }

  redirect(url: string) {
    window.open(url)
  }
}
