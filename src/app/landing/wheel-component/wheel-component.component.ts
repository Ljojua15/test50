import { animate, AnimationBuilder, sequence, style } from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-wheel-component',
  templateUrl: './wheel-component.component.html',
  styleUrls: ['./wheel-component.component.scss']
})
export class WheelComponentComponent implements OnInit {
  @ViewChild('prizeElement') prizeElement!: ElementRef;
  @Input() wheelType: 1 | 2 = 1;

  filePath = environment.filePath;

  amount = 0;
  openPopup = false;
  openMoneyPopup = false;
  wheelDegree = 0;
  offset = 0;
  isDisabled: boolean = false;
  prizeType = 'EGT_FREESPIN';

  constructor(
    private builder: AnimationBuilder
  ) { }

  ngOnInit(): void {
  }

  switchPrize(id: number) {
    switch (id) {
      case 1:
        return 4;
      case 2:
        return 3;
      case 3:
        return 2;
      case 4:
        return 1;
      default:
        return 0;
    }
  }

  onGetPrize() {
    this.makeAnimation(1);
  }

  makeAnimation(id: number) {
    this.isDisabled = true;
    // this.newEvent.emit(true);
    const prizeId = this.switchPrize(id);
    let middleDegree = 36;
    let additionalDegree = 72;
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
      if ((this.prizeType = 'EGT_FREESPIN')) {
        this.openPopup = true;
      } else {
        this.openMoneyPopup = true;
      }
      this.isDisabled = false;
      // this.newEvent.emit(false);
    });
  }
}
