import {
  animate,
  AnimationBuilder,
  sequence,
  style,
} from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { Prize } from 'src/app/shared/models/prize';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crc-wheel-container',
  templateUrl: './wheel-container.component.html',
  styleUrls: ['./wheel-container.component.scss'],
})
export class WheelContainerComponent implements OnInit {
  @ViewChild('prizeElement') prizeElement!: ElementRef;
  @Input() isDisabled = false;

  filePath = environment.filePath;
  imagePath = `./../../../../${this.filePath}assets/images`;

  // image paths
  arrowPath = `${this.imagePath}/wheel-arrow.png`;
  framePath = `${this.imagePath}/wheel-frame.png`;
  btnPath = `${this.imagePath}/wheel-btn.png`;
  btnDisabledPath = `${this.imagePath}/wheel-btn-disabled.png`;
  prizesPath = this.translateService.onLangChange.pipe(
    map((lang) => `${this.imagePath}/wheel-prizes-${lang.lang}.png`)
  );

  // campaign id for get prize
  campaignId = '';

  // openPopup = false;

  wheelDegree = 0;
  offset = 0;

  constructor(
    private builder: AnimationBuilder,
    private translateService: TranslateService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {}

  getPrize() {
    return this.campaignService
      .getPrize(this.campaignId)
      .pipe(map((res: any) => res.data))
      .subscribe((res: Prize) => this.makeAnimation(res.prizeId));
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
