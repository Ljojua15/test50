import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProgressData } from 'src/app/shared/models/progressData';

@Component({
  selector: 'crc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnChanges {
  @Input() progressData: ProgressData = {
    levels: [],
    amount: 0,
  };

  @Input() userData = {
    unlockedLevel: 0,
    used: 0,
  };

  // index of unlocked items
  currentIndex = 0;

  // current fraction width
  extraWidth = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getCurrentIndex();
    console.log(this.userData);
  }

  getCurrentIndex() {
    for (let item of this.progressData.levels) {
      if (item.step >= this.progressData.amount) {
        this.currentIndex = this.progressData.levels.findIndex(
          (x: any) => x.step === item.step
        );
        this.getExtraWidth();
        this.changeImageStates();
        return;
      }
    }
  }

  // ???
  getExtraWidth() {
    if (this.currentIndex === 0) {
      this.extraWidth =
        ((this.progressData.levels[0].step / this.progressData.levels[0].step) *
          this.progressData.amount *
          100) /
        this.progressData.levels[0].step;
    } else {
      const fractionAmount =
        this.progressData.levels[this.currentIndex].step -
        this.progressData.levels[this.currentIndex - 1].step;
      const extraPoints =
        this.progressData.amount -
        this.progressData.levels[this.currentIndex - 1].step;
      this.extraWidth = (extraPoints / fractionAmount) * 100;
    }
  }

  changeImageStates() {
    const baseSpinsUsed = this.userData.used % 5;
    const goldSpinsUsed = Math.floor(this.userData.used / 5);

    this.progressData.levels.forEach((level, index) => {
      // check active icons
      if (this.userData.unlockedLevel >= index) level.imageState = 'on';

      if (baseSpinsUsed > index) level.imageState = 'done';

      // if every level is 1 point
      // if (this.userData.used >= index) level.imageState = 'done';
    });

    // change slice if last levels costs more points
    this.progressData.levels.slice(3).forEach((level, index) => {
      if (goldSpinsUsed > index) level.imageState = 'done';
    });
  }
}
