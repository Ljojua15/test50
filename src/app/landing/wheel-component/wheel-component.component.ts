import {
  animate,
  AnimationBuilder,
  sequence,
  style,
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-wheel-component',
  templateUrl: './wheel-component.component.html',
  styleUrls: ['./wheel-component.component.scss'],
})
export class WheelComponentComponent implements OnInit {
  @ViewChild('prizeElement') prizeElement!: ElementRef;
  @Input() wheelType = 'silver';
  @Output() newEvent = new EventEmitter();

  amount = 0;
  openPopup = false;
  wheelDegree = 0;
  offset = 0;
  isDisabled: boolean = false;

  constructor(private builder: AnimationBuilder) {}

  ngOnInit(): void {}

  switchPrize(id: number) {
    switch (id) {
      case 1:
        return 7;
      case 2:
        return 2;
      case 3:
        return 6;
      case 4:
        return 8;
      case 5:
        return 4;
      case 6:
        return 3;
      case 7:
        return 5;
      case 8:
        return 1;
      default:
        return 0;
    }
  }

  makeAnimation(id: number) {
    console.log(id);

    this.isDisabled = true;
    this.newEvent.emit(true);
    // const prizeId = 5;
    const prizeId = this.switchPrize(id);
    // const prizeId = id;
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
      this.openPopup = true;
      this.isDisabled = false;
      this.newEvent.emit(false);
      // this.campaign.updateUserData();
    });
  }
}
