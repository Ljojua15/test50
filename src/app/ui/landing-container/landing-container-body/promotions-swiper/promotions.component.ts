import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { IframeService } from 'src/app/services/iframe.service';
import SwiperCore, { Navigation, SwiperOptions } from 'swiper';

SwiperCore.use([Navigation]);

@Component({
  selector: 'crc-promotions-swiper',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PromotionsSwiperComponent implements OnInit {
  promos: any = [];

  config: SwiperOptions = {
    slidesPerView: 3,
    // spaceBetween: 60,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(
    private campaignService: CampaignService,
    private translateService: TranslateService,
    private iFrameService: IframeService
  ) {}

  ngOnInit(): void {
    this.translateService.onLangChange
      .pipe(
        map((language: any) => {
          const lang = language.lang === 'ge' ? 'ka' : language.lang;
          return lang;
        })
      )
      .subscribe((res) => {
        this.getBanners(res);
      });
  }

  getBanners(lang: string) {
    this.campaignService
      .getBanners()
      .pipe(
        map((res) =>
          res.data.map((item: any) => {
            return {
              image: item.image[lang],
              href: item.href[lang],
            };
          })
        )
      )
      .subscribe((res) => {
        this.promos = res;
      });
  }

  onClick(url: string) {
    this.iFrameService.openNewTab(url);
  }
}
