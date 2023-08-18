import {
  animate,
  AnimationBuilder,
  sequence,
  style,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { BackdropService } from 'src/app/services/backdrop.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { Prize } from 'src/app/shared/models/prize';
import { environment } from 'src/environments/environment';
import { checkDate } from './entities';
import { PopupService } from './popup.service';

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
  readonly redirectUrlPlinko =
    'https://crocobet.com/#/mini-games/plinko?game=PLINKO';
  readonly redirectUrlEGT =
    'https://crocobet.com/#/slots/play?slot=Zodiac%20Wheel&provider=egt&filter=egt';
  @ViewChild('prizeElement') prizeElement!: ElementRef;
  @Input() available = 0;
  @Output() availableChange = new EventEmitter<boolean>();
  @Output() animationDone = new EventEmitter<void>();
  @Input() isDisabled = false;
  @Input() set isAuthorized(value: boolean) {
    if (!value) {
      this.history = [];
      this.historyPopup = false;
    } else {
      this.getHistory();
    }
  }
  @Input() history: any = [];
  isButtonDisabled$ = new BehaviorSubject<boolean>(false);

  filePath = environment.filePath;
  imagePath = `./../../../../${this.filePath}assets/images`;

  // image paths
  arrowImage = `${this.imagePath}/wheel-arrow.webp`;
  frameImage = `${this.imagePath}/wheel-frame.webp`;
  buttonImage = `${this.imagePath}/wheel-btn-active.webp`;
  buttonDisabledImage = `${this.imagePath}/wheel-btn-inactive.webp`;
  // prizesImage = this.translateService.onLangChange.pipe(
  //   map((lang) => `${this.imagePath}/wheel-prizes-${lang.lang}.webp`)
  // );
  prizesImage = `${this.imagePath}/wheel-prizes-en.webp`;

  // campaign id for get prize
  campaignId = 'plinko-wheel-040823';
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
    transform: 'translate(17.25%, -31%)',
  };
  infoPop = {
    'background-color': '#1b3a28',
    'background-image': 'url("./assets/images/info-pop.webp")',
    transform: 'translate(17.77%, -45%)',
    width: '560px',
    height: '320px',
  };
  historyPopupContainerStyles = {
    'background-image': 'url("./assets/images/history-popup.webp")',
    width: '600px',
    height: '360px',
    transform: 'translate(13.25%, -50%)',
  };

  disableSpin = false;

  wheelDegree = 0;
  offset = 0;

  prizeType: string = PrizeType.PLINKO;

  backdrop$: Observable<boolean> | null = null;
  openInfo() {
    this.infoPopup = true;
    this.historyPopup = false;
    this.popupService.sendUpdate(false);
  }
  openHistory() {
    if (this.isLoggedIn) {
      this.historyPopup = true;
      this.infoPopup = false;
      this.popupService.sendUpdate(false);
    }
    console.log(this.history);
  }
  constructor(
    private builder: AnimationBuilder,
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private backdropService: BackdropService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private popupService: PopupService
  ) {
    this.translateService.onLangChange.subscribe((lang) => {
      console.log(lang.lang);
    });
    this.authService.isAuthorized().subscribe((res) => {
      this.isLoggedIn = res;
      this.cdr.detectChanges();
    });
  }
  spinAmount: number = 0;
  ngOnInit(): void {
    this.backdrop$ = this.backdropService.backDrop$.asObservable();
    this.popupService.getUpdate().subscribe((res) => {
      if (res) {
        this.infoPopup = !res;
        this.historyPopup = !res;
        this.cdr.detectChanges();
      }
    });
    this.isButtonDisabled$.next(false);
  }

  closePopup() {
    this.infoPopup = false;
    this.historyPopup = false;
    this.winPopup = false;
    this.cdr.detectChanges();
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
        this.isButtonDisabled$.next(true);
        this.spinAmount = res.prize.amount;
        this.prizeType = res.prize.type;
        if (this.prizeType === 'PLINKO_FREESPIN') {
          this.plinko = true;
        }
        if (this.prizeType === 'EGT_FREESPIN') {
          this.plinko = false;
        }
        this.makeAnimation(res.prizeId);
        this.getHistory();
        this.cdr.detectChanges();
      });
  }
  // getPrize() {
  //   this.makeAnimation(1);
  //   // this.isButtonDisabled$.next(true);
  //   this.available -= 1;
  //   this.cdr.detectChanges();
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
    console.log(this.history);
  }

  switchPrize(id: number) {
    switch (id) {
      case 1:
        return 5;
      case 2:
        return 3; //
      case 3:
        return 9; //
      case 4:
        return 7; //
      case 5:
        return 0; //
      case 6:
        return 10; //
      case 7:
        return 1; //
      case 8:
        return 6;
      case 9:
        return 8; //
      case 10:
        return 2; //
      default:
        return 4;
    }
  }

  makeAnimation(id: number) {
    this.isDisabled = true;
    this.isButtonDisabled$.next(true);
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
      this.isButtonDisabled$.next(false);
      this.animationDone.emit();
      this.cdr.detectChanges();
    });
  }
}
