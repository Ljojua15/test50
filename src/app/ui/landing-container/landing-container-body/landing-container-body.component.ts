import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { WithdrawPopupService } from 'src/app/services/withdraw-popup.service';
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
      .getUserData('bonus-shop-napoli-ticket')
      .pipe(map((res) => res.data))
      .subscribe((bonusShopRes: any) => {
        this.withdrawPopupService.changeWithdrawPopupState(
          bonusShopRes.state.cashout
        );
      });
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
