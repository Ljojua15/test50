import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { WithdrawPopupService } from 'src/app/services/withdraw-popup.service';
import { CashOut } from 'src/app/shared/models/cashout';
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
  @Input() set isAuthorized(value: boolean) {
    if (value || environment.testToken) {
      this.getData();
    } else {
      this.clearData();
    }
  }

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
    hasBreaks: true,
    hasOutline: true,
    hasGelSymbol: true,
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

  showWithdrawPopup$: Observable<CashOut | boolean> =
    this.withdrawPopupService.showWithdrawPopup$;
  showCongratPopup$: Observable<any> =
    this.withdrawPopupService.showCongratPopup$;

  constructor(
    private campaignService: CampaignService,
    private withdrawPopupService: WithdrawPopupService
  ) {}

  ngOnInit(): void {
    this.campaignService.updateUserData.subscribe(() => {
      this.getData();
    });
  }

  getData() {
    return this.campaignService
      .getUserData('p2p-mix-wheel-030723')
      .pipe(map((res) => res.data))
      .subscribe((res: any) => {
        // this.withdrawPopupService.changeWithdrawPopupState(
        //   res.state.cashout
        // );

        this.userData = {
          unlockedLevel: res.state.currentStepIndex,
          used: res.state.used,
          amount: Math.min(
            res.state.progress,
            this.levels[this.levels.length - 1].step
          ),
        };
      });
  }

  clearData() {
    this.levels.forEach((level) => (level.imageState = 'off'));

    this.userData = {
      unlockedLevel: -1,
      used: 0,
      amount: 0,
    };
  }

  // getHistory() {
  //   return this.campaignService
  //     .getHistory('ufo-double-wheel-190822')
  //     .subscribe((res) => console.log(res));
  // }
}
