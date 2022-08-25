import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'crc-landing-container-body',
  templateUrl: './landing-container-body.component.html',
  styleUrls: ['./landing-container-body.component.scss'],
})
export class LandingContainerBodyComponent implements OnInit {
  @Input() set isAuthorized(value: boolean) {
    if (value) {
      this.getData();
    } else {
      this.clearData();
    }
  }

  // toggle play button heartbeat animation
  hasAnimation = true;

  // disable wheel button
  isDisabled = true;

  // progress bar levels and progress amount
  progressData: any = {
    levels: [],
    amount: 0,
  };

  userData = {
    unlockedLevel: 0,
    used: 0,
  };

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {}

  getData() {
    return this.campaignService
      .getUserData('ufo-double-wheel-190822')
      .pipe(
        map((res) => {
          res.data.state.steps.forEach((step: any) => {
            step.imageState = 'off';
            step.points < 5 ? (step.points = 1) : (step.points = 5); // change if last points costs more
          });
          return res.data;
        })
      )
      .subscribe((res: User) => {
        this.progressData = {
          levels: res.state.steps,
          amount: Math.floor(Math.min(res.state.progress, 2500)), // limit max score
        };

        this.userData = {
          unlockedLevel: res.state.currentStepIndex,
          used: res.state.used,
        };
      });
  }

  clearData() {
    this.progressData = {
      levels: [],
      amount: 0,
    };

    this.userData = {
      unlockedLevel: 0,
      used: 0,
    };
  }

  // getHistory() {
  //   return this.campaignService
  //     .getHistory('ufo-double-wheel-190822')
  //     .subscribe((res) => console.log(res));
  // }
}
