import { Component, Input, OnChanges } from '@angular/core';
import { Config } from 'src/app/shared/models/progressConfig';
import { Levels } from 'src/app/shared/models/progressData';
import { UserData } from 'src/app/shared/models/userData';

@Component({
  selector: 'crc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnChanges {
  @Input() levels!: Levels[];
  @Input() userData!: UserData;
  @Input() config!: Config;

  // index of unlocked items
  currentIndex = 0;
  // current fraction width
  extraWidth = 0;

  ngOnChanges(): void {
    this.getCurrentIndex();
  }

  getCurrentIndex() {
    for (let i = 0; i < this.levels.length; i++) {
      if (this.levels[i].step >= this.userData.amount) {
        this.currentIndex = i;
        this.getExtraWidth(this.currentIndex);
        this.changeImageStates();
        return;
      }
    }
  }

  // calculate width for active segment
  getExtraWidth(index: number) {
    if (index === 0) {
      this.extraWidth = (this.userData.amount * 100) / this.levels[0].step;
    } else {
      const fractionAmount =
        this.levels[index].step - this.levels[index - 1].step;
      const extraPoints = this.userData.amount - this.levels[index - 1].step;
      this.extraWidth = (extraPoints / fractionAmount) * 100;
    }
  }

  changeImageStates() {
    const baseSpinsUsed = this.userData.used % 5; // change depending on last points
    const goldSpinsUsed = Math.floor(this.userData.used / 5); // change depending on last points

    this.levels.forEach((level, index) => {
      if (this.userData.unlockedLevel >= index) level.imageState = 'on';
      if (baseSpinsUsed > index) level.imageState = 'done';
      // if every level is 1 point
      // if (this.userData.used >= index) level.imageState = 'done';
    });

    // change slice if last levels costs more points
    this.levels.slice(3).forEach((level, index) => {
      if (goldSpinsUsed > index) level.imageState = 'done';
    });
  }
}
