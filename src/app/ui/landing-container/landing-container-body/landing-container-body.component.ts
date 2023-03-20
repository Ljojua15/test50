import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { CashOut } from 'src/app/shared/models/cashout';
import { CongratPopupData } from 'src/app/shared/models/congratPopupData';
import { Levels, ProgressData } from 'src/app/shared/models/progressData';
import { User } from 'src/app/shared/models/user';
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

  // progress bar levels and progress amount
  progressData: ProgressData = {
    levels: this.levels,
    amount: 0,
  };

  userData: UserData = {
    unlockedLevel: -1,
    used: 0,
  };

  showWithdrawPopup$: Observable<CashOut | boolean> =
    this.campaignService.showWithdrawPopup$;
  showCongratPopup$: Observable<any> = this.campaignService.showCongratPopup$;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaignService.updateUserData.subscribe(() => {
      this.getData();
    });
  }

  getData() {
    return this.campaignService
      .getUserData('bonus-shop-napoli-ticket')
      .pipe(map((res) => res.data))
      .subscribe((bonusShopRes: any) => {
        this.campaignService.changeWithdrawPopupState(
          bonusShopRes.state.cashout
        );

        // this.progressData.amount = Math.floor(
        //   Math.min(res.state.progress, this.levels[this.levels.length - 1].step)
        // );

        // this.userData = {
        //   unlockedLevel: res.state.currentStepIndex,
        //   used: res.state.used,
        // };
      });
  }

  onPopupClose(e: any) {
    if (
      e.srcElement.className == 'x_close' ||
      e.srcElement.className == 'background' ||
      e.srcElement.className == 'background__close' ||
      e.srcElement.className == 'main__congrets-close' ||
      e.srcElement.className == 'main__button' ||
      e.srcElement.className == 'withdraw-background__close'
    ) {
      this.campaignService.changeWithdrawPopupState(false);
      this.campaignService.changeCongratPopupState(false);
    }
  }

  clearData() {
    this.levels.forEach((level) => (level.imageState = 'off'));

    this.progressData = {
      levels: this.levels,
      amount: 0,
    };

    this.userData = {
      unlockedLevel: -1,
      used: 0,
    };
  }

  // getHistory() {
  //   return this.campaignService
  //     .getHistory('ufo-double-wheel-190822')
  //     .subscribe((res) => console.log(res));
  // }
}
