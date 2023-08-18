import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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
      this.getHistory();
    } else {
      this.clearData();
    }
  }
  @Input() history: any[] = [];
  isAuth = this.authService.isAuthorized();

  // toggle play button heartbeat animation
  hasAnimation = true;

  // disable wheel button
  isDisabled = false;

  levels: Levels[] = [
    { step: 50, points: 1, imageState: 'off' },
    { step: 100, points: 1, imageState: 'off' },
    { step: 250, points: 1, imageState: 'off' },
    { step: 500, points: 1, imageState: 'off' },
    { step: 1000, points: 1, imageState: 'off' },
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

  available = 0;

  constructor(
    private campaignService: CampaignService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.cdr.detectChanges();
    // }, 500);
  }

  getData() {
    return this.campaignService
      .getUserData('plinko-wheel-040823')
      .pipe(
        map((res) => res.data),
        tap(console.log)
      )
      .subscribe((res: User) => {
        this.progressData.amount = Math.floor(
          Math.min(res.state.progress, this.levels[this.levels.length - 1].step)
        );

        this.userData = {
          unlockedLevel: res.state.currentStepIndex,
          used: res.state.used,
          amount: res.state.progress, // ???
        };
        this.available = res.state.available;
        console.log('available', this.available);
        this.getHistory();
        this.cdr.detectChanges();
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

  getHistory() {
    return this.campaignService
      .getHistory('plinko-wheel-040823')
      .subscribe((res) => (this.history = Object.entries(res)));
  }
}
