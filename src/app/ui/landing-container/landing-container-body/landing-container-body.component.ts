import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { map } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { Levels, ProgressData } from 'src/app/shared/models/progressData';
import { User } from 'src/app/shared/models/user';
import { UserData } from 'src/app/shared/models/userData';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crc-landing-container-body',
  templateUrl: './landing-container-body.component.html',
  styleUrls: ['./landing-container-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    amount: 0,
  };

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {}

  getData() {
    return this.campaignService
      .getUserData('ufo-double-wheel-190822')
      .pipe(map((res) => res.data))
      .subscribe((res: User) => {
        this.progressData.amount = Math.floor(
          Math.min(res.state.progress, this.levels[this.levels.length - 1].step)
        );

        this.userData = {
          unlockedLevel: res.state.currentStepIndex,
          used: res.state.used,
          amount: res.state.progress, // ???
        };
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
      amount: 0,
    };
  }

  // getHistory() {
  //   return this.campaignService
  //     .getHistory('ufo-double-wheel-190822')
  //     .subscribe((res) => console.log(res));
  // }
}
