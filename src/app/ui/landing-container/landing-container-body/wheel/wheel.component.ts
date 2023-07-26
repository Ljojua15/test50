import {
  animate,
  AnimationBuilder,
  sequence,
  style,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BackdropService } from 'src/app/services/backdrop.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { Prize } from 'src/app/shared/models/prize';
import { environment } from 'src/environments/environment';
import { checkDate } from './entities';

export enum PrizeType {
  PLINKO = 'PLINKO_MAX_WHEEL',
  EGT = 'EGT_INTERACTIVE',
}
@Component({
  selector: 'crc-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WheelComponent implements OnInit {
  @ViewChild('prizeElement') prizeElement!: ElementRef;
  @Input() available = 0;
  @Output() availableChange = new EventEmitter<boolean>();
  @Input() isDisabled = false;
  @Input() set isAuthorized(value: boolean) {
    if (!value) {
      this.history = [];
      this.historyPopup = false;
    } else {
      this.getHistory();
    }
  }
  history: any = [];

  filePath = environment.filePath;
  imagePath = `./../../../../${this.filePath}assets/images`;

  // image paths
  arrowImage = `${this.imagePath}/wheel-arrow.webp`;
  frameImage = `${this.imagePath}/wheel-frame.webp`;
  buttonImage = `${this.imagePath}/wheel-btn-active.webp`;
  buttonDisabledImage = `${this.imagePath}/wheel-btn-active.webp`;
  // prizesImage = this.translateService.onLangChange.pipe(
  //   map((lang) => `${this.imagePath}/wheel-prizes-${lang.lang}.webp`)
  // );
  prizesImage = `${this.imagePath}/wheel-prizes-en.webp`;

  // campaign id for get prize
  campaignId = '';
  mockData = [
    { k: 'ეგტ', v: 'asd' },
    { k: 'ეგტ', v: 'asd' },
    { k: 'ეგტ', v: 'asd' },
    { k: 'ეგტ', v: 'asd' },
    { k: 'ეგტ', v: 'asd' },
    { k: 'ეგტ', v: 'asd' },
    { k: 'ეგტ', v: 'asd' },
  ];
  isLoggedIn!: boolean;

  // popup configuration
  infoPopup = false;
  historyPopup = false;
  winPopup = false;
  plinko = true;
  popupContainerStyles = {
    'background-color': '#1b3a28',
    'background-image': 'url("./assets/images/info-popup.webp")',
  };
  historyPopupContainerStyles = {
    'background-image': 'url("./assets/images/history-popup.webp")',
    width: '600px',
    height: '360px',
  };

  disableSpin = false;

  wheelDegree = 0;
  offset = 0;

  prizeType: string = PrizeType.PLINKO;

  backdrop$: Observable<boolean> | null = null;
  openInfo() {
    this.infoPopup = true;
  }
  openHistory() {
    if (this.isLoggedIn) {
      this.historyPopup = true;
    }
  }
  constructor(
    private builder: AnimationBuilder,
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private backdropService: BackdropService,
    private authService: AuthService
  ) {
    this.translateService.onLangChange.subscribe((lang) => {
      console.log(lang.lang);
    });
    this.authService.isAuthorized().subscribe((res) => {
      this.isLoggedIn = res;
    });
  }
  spinAmount: number = 0;
  ngOnInit(): void {
    this.backdrop$ = this.backdropService.backDrop$.asObservable();
  }

  closePopup() {
    this.infoPopup = false;
    this.historyPopup = false;
    this.winPopup = false;
  }

  // getPrize() {
  //   return this.campaignService
  //     .getPrize(this.campaignId)
  //     .pipe(map((res: any) => res.data))
  //     .subscribe((res: Prize) => this.makeAnimation(res.prizeId));
  // }
  getPrize() {
    this.disableSpin = true;
    return this.campaignService
      .getPrize(this.campaignId)
      .pipe(map((res: any) => res.data))
      .subscribe((res: Prize) => {
        this.spinAmount = res.prize.amount;
        this.prizeType = res.prize.type;
        this.makeAnimation(res.prizeId);
      });
  }
  // getPrize() {
  //   this.makeAnimation(1);
  // }

  getHistory() {
    this.history = [];
    this.campaignService.getHistory(this.campaignId).subscribe((res: any) => {
      res.data.forEach((item: any) => {
        if (checkDate(item)) {
          const split1 = item.createdAt.split('T')[0];
          const [year, month, day] = split1.split('-');
          item.createdAt = `${month}.${day}`;
          item.prize = item.prize.name.replace(/-/g, ' ', '-').toUpperCase();
          this.history.push(item);
        }
      });
    });
  }

  switchPrize(id: number) {
    switch (id) {
      case 1:
        return 10;
      case 2:
        return 1; //
      case 3:
        return 6; //
      case 4:
        return 5; //
      case 5:
        return 3; //
      case 6:
        return 2; //
      case 7:
        return 4; //
      case 8:
        return 9;
      case 9:
        return 7; //
      case 10:
        return 8; //
      default:
        return 0;
    }
  }

  makeAnimation(id: number) {
    this.isDisabled = true;
    const prizeId = this.switchPrize(id);
    let middleDegree = 0;
    let additionalDegree = 32.7;
    const beforeAddition = this.wheelDegree;
    this.wheelDegree += 1080 + additionalDegree * prizeId + middleDegree;

    const myAnimation = this.builder.build([
      style({ transform: `rotate(${beforeAddition})` }),
      sequence([
        animate(
          `${5000}ms cubic-bezier(0.25, 0, 0, 1.05)`,
          style({ transform: `rotate(${this.wheelDegree - this.offset}deg)` })
        ),
        animate(
          `${750}ms linear`,
          style({ transform: `rotate(${this.wheelDegree - this.offset}deg)` })
        ),
      ]),
    ]);
    this.wheelDegree -= middleDegree;
    this.offset = this.wheelDegree % 360;

    const player = myAnimation.create(this.prizeElement.nativeElement);
    player.play();
    player.onDone(() => {
      // this.isDisabled = false;
      this.disableSpin = false;
      this.winPopup = true;
      this.getHistory();
      this.availableChange.emit(true);
    });
  }
}
