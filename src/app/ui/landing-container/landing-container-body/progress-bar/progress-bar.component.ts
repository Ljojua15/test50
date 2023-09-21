import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Config } from 'src/app/shared/models/progressConfig';
import { Levels } from 'src/app/shared/models/progressData';

@Component({
  selector: 'crc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements AfterViewInit {
  @ViewChild('progress') progressEl: ElementRef;

  @Input() levels!: Levels[];
  @Input() progressData!: any;
  @Input() config!: Config;

  popup = false;
  popupContainerStyles = {
    'background-color': '#145674',
    'box-shadow': 'inset 0px 3px 2px -2px #fff',
    width: '100%',
    'max-width': '420px',
    padding: '30px',
    'border-radius': '18px',
    height: 'auto',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  progressStartValue = 0;
  progressEndValue = 0;
  speed = 10;

  ngAfterViewInit(): void {
    this.progressEndValue = this.progressData.progress;
    let progress = setInterval(() => {
      this.progressEl.nativeElement.style.background = `conic-gradient(#00a75b ${
        this.progressStartValue * 3.6
      }deg, #07435E 0deg)`;

      if (this.progressStartValue === this.progressEndValue) {
        clearInterval(progress);
      }

      this.progressStartValue++;
    }, this.speed);
  }

  closePopup() {
    this.popup = false;
  }
}
