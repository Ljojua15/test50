import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/models/progressConfig';
import { Levels } from 'src/app/shared/models/progressData';

@Component({
  selector: 'crc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent {
  @ViewChild('progress') progressEl: ElementRef;

  data: any = null;

  @Input() levels!: Levels[];
  @Input() config!: Config;
  popup = false;
  popupContainerStyles = {
    'background-color': '#145674',
    'box-shadow': 'inset 0px 3px 2px -2px #fff',
    width: '100%',
    'max-width': '550px',
    padding: '30px',
    'border-radius': '18px',
    height: 'auto',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    'text-align': 'center',
  };
  progressStartValue = 0;
  progressEndValue = 0;
  speed = 10;

  progressColor = '#00a75b';

  @Input() set progressData(progressData: any) {
    this.data = progressData;
    this.setProgress();
  }

  closePopup() {
    this.popup = false;
  }

  setProgress() {
    console.log(this.data);
    if (this.data.isBooster) {
      this.progressColor = '#bb9e53';
    } else {
      this.progressColor = '#00a75b';
    }

    this.progressStartValue = 0;

    this.progressEndValue = this.data.progress;
    let progress = setInterval(() => {
      this.progressEl.nativeElement.style.background = `conic-gradient(${
        this.progressColor
      } ${this.progressStartValue * 7.2}deg, #07435E 0deg)`;

      if (this.progressStartValue === this.progressEndValue) {
        clearInterval(progress);
      }

      this.progressStartValue++;
    }, this.speed);
  }
}
