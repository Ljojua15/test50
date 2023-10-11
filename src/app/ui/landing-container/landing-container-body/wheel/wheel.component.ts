import {
  animate,
  AnimationBuilder,
  sequence,
  style,
} from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { BackdropService } from 'src/app/services/backdrop.service';
import { CampaignService } from 'src/app/services/campaign.service';
import { Prize } from 'src/app/shared/models/prize';
import { GenericResponse } from 'src/app/shared/models/response';

@Component({
  selector: 'crc-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
})
export class WheelComponent implements OnInit {
  @ViewChild('prizeElement') prizeElement!: ElementRef;
  @Input() isDisabled = false;
  showWheelInfo = false;
  // image paths
  framepalma = `assets/iimages/wheel/wheel-tree.webp`;
  framebg = `assets/iimages/wheel/wheel-round-bg.webp`;
  arrowImage = `assets/iimages/wheel/wheel-nody.webp`;
  frameImage = `assets/iimages/wheel/wheel-main.webp`;
  buttonImage = `assets/iimages/wheel/wheel-spin.webp`;
  buttonDisabledImage = `assets/iimages/wheel/wheel-spin.webp`;
  prizesImage = this.translateService.onLangChange.pipe(
    map((lang) => `assets/images/wheel-prizes-${lang.lang}.png`)
  );
  isDisabledGet = false;
  // campaign id for get prize
  campaignId = '';

  // popup configuration
  popup = false;
  popupContainerStyles = {
    'background-color': '#1b3a28',
  };

  wheelDegree = 0;
  offset = 0;

  backdrop$: Observable<boolean> | null = null;

  constructor(
    private builder: AnimationBuilder,
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private backdropService: BackdropService
  ) {}

  ngOnInit(): void {
    this.backdrop$ = this.backdropService.backDrop$.asObservable();
    console.log('isExecuted');
  }

  closePopup() {
    this.popup = false;
  }

  getPrize() {
    this.isDisabledGet = true;
    this.makeAnimation(1);
    // return this.campaignService
    //   .getPrize(this.campaignId)
    //   .pipe(map((res: GenericResponse<Prize>) => res.data))
    //   .subscribe((res: Prize) => this.makeAnimation(res.prizeId));
  }

  switchPrize(id: number) {
    switch (id) {
      case 1:
        return 7;
      case 2:
        return 4;
      case 3:
        return 6;
      case 4:
        return 3;
      case 5:
        return 2;
      case 6:
        return 0;
      case 7:
        return 5;
      case 8:
        return 1;
      default:
        return 7;
    }
  }

  makeAnimation(id: number) {
    this.isDisabled = true;
    const prizeId = this.switchPrize(id);
    let middleDegree = 32.7;
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
      this.isDisabledGet = false;
      // this.openPopup = true;
      // this.isDisabled = false;
    });
  }
}
