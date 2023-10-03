import { Component, HostListener, Input, OnInit } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { Config } from 'src/app/shared/models/progressConfig';
import { Levels } from 'src/app/shared/models/progressData';
import { UserData } from 'src/app/shared/models/userData';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crc-landing-container-body',
  templateUrl: './landing-container-body.component.html',
  styleUrls: ['./landing-container-body.component.scss'],
})
export class LandingContainerBodyComponent implements OnInit {
  // toggle play button heartbeat animation
  hasAnimation = true;
  // disable wheel button
  isDisabled = true;
  levels: Levels[] = [
    { step: 100, points: 1, imageState: 'off' },
    { step: 500, points: 1, imageState: 'off' },
    { step: 1000, points: 1, imageState: 'off' },
    { step: 5000, points: 1, imageState: 'off' },
    { step: 10000, points: 1, imageState: 'off' },
  ];
  progressConfig: Config = {
    hasOutline: true,
    hasGelSymbol: true,
    breakType: 'line', // 'line' | 'dot' | ''
    containerColor: '#937050',
    progressBarColor: '#15af44',
    progressBarFilledColor: '#5f2797',
    sliderColor: '#15af44',
    texts: {
      top: 'bet',
      bottom: 'spin',
    },
    // if no texts
    // texts: null,
  };
  userData: UserData = {
    unlockedLevel: -1,
    used: 0,
    amount: 0,
  };

  progressData = {
    balance: 0,
    progress: 0,
    total: 0,
    isBooster: true,
  };

  isMobile = false;

  constructor(private campaignService: CampaignService) {}

  @Input() set isAuthorized(value: boolean) {
    if (value || environment.testToken) {
      this.getData();
    } else {
      this.clearData();
    }
  }

  ngOnInit(): void {
    if (window.innerWidth < 767) {
      this.isMobile = true;
    }

    this.campaignService.updateUserData.subscribe((_) => {
      this.getData();
    });
  }

  // get progress
  getData() {
    return this.campaignService
      .getBalance()
      .pipe(map((res: any) => res.data))
      .subscribe((res: any) => {
        console.log(res);
        this.progressData = {
          total: res.total,
          progress: Math.floor(res.progressForNextSpin),
          balance: res.balance,
          isBooster: !res.total,
        };
        console.log(this.progressData);
      });
  }

  clearData() {
    this.levels.forEach((level) => (level.imageState = 'off'));

    this.userData = {
      unlockedLevel: -1,
      used: 0,
      amount: 0,
    };

    this.progressData = {
      balance: 0,
      progress: 0,
      total: 0,
      isBooster: true,
    };
  }

  // @HostListener('window:message', ['$event'])
  // onMessage(event: MessageEvent) {
  //   of(event)
  //     .pipe(
  //       tap((res) => {
  //         console.log(res);
  //       })
  //     )
  //     .subscribe((res) => {});
  // }

  // getHistory() {
  //   return this.campaignService
  //     .getHistory('ufo-double-wheel-190822')
  //     .subscribe((res) => console.log(res));
  // }
}
