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
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, tap } from 'rxjs';
import { BackdropService } from 'src/app/services/backdrop.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { Prize } from 'src/app/shared/models/prize';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crc-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WheelComponent implements OnInit {
  @ViewChild('prizeElement') prizeElement!: ElementRef;
  @Input() isDisabled = false;

  filePath = environment.filePath;
  imagePath = `./../../../../${this.filePath}assets/images`;

  // image paths
  arrowImage = `${this.imagePath}/wheel-arrow.webp`;
  frameImage = `${this.imagePath}/wheel-frame.webp`;
  buttonImage = `${this.imagePath}/wheel-btn-active.webp`;
  buttonDisabledImage = `${this.imagePath}/wheel-btn-disabled.webp`;
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
  // popup configuration
  infoPopup = false;
  historyPopup = false;
  popupContainerStyles = {
    'background-color': '#1b3a28',
    'background-image': 'url("../../../../../assets/images/info-popup.webp")',
  };
  historyPopupContainerStyles = {
    'background-image':
      'url("../../../../../assets/images/history-popup.webp")',
    width: '600px',
    height: '360px',
  };

  wheelDegree = 0;
  offset = 0;

  backdrop$: Observable<boolean> | null = null;
  openInfo() {
    this.infoPopup = true;
  }
  openHistory() {
    this.historyPopup = true;
  }
  constructor(
    private builder: AnimationBuilder,
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private backdropService: BackdropService
  ) {
    this.translateService.onLangChange.subscribe((lang) => {
      console.log(lang.lang);
    });
  }

  ngOnInit(): void {
    this.backdrop$ = this.backdropService.backDrop$.asObservable();
  }

  closePopup() {
    this.infoPopup = false;
    this.historyPopup = false;
  }

  // getPrize() {
  //   return this.campaignService
  //     .getPrize(this.campaignId)
  //     .pipe(map((res: any) => res.data))
  //     .subscribe((res: Prize) => this.makeAnimation(res.prizeId));
  // }
  getPrize() {
    this.makeAnimation(8);
  }
  switchPrize(id: number) {
    switch (id) {
      case 1:
        return 17;
      case 2:
        return 13; //
      case 3:
        return 3; //
      case 4:
        return 1; //
      case 5:
        return 9; //
      case 6:
        return 7; //
      case 7:
        return 5; //
      case 8:
        return 11;
      case 9:
        return 19; //
      case 10:
        return 15; //
      default:
        return 19;
    }
  }

  makeAnimation(id: number) {
    this.isDisabled = true;
    const prizeId = this.switchPrize(id);
    let middleDegree = 20;
    let additionalDegree = 45;
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
      // this.openPopup = true;
      // this.isDisabled = false;
    });
  }
}
