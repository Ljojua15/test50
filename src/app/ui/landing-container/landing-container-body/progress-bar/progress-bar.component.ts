import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Config } from 'src/app/shared/models/progressConfig';
import { Levels } from 'src/app/shared/models/progressData';
import { UserData } from 'src/app/shared/models/userData';

@Component({
  selector: 'crc-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss'],
})
export class ProgressBarComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('progress') progressEl: ElementRef;

  @Input() levels!: Levels[];
  @Input() userData!: UserData;
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
  progressEndValue = 60;
  speed = 10;

  ngOnInit(): void {}

  ngOnChanges(): void {}

  ngAfterViewInit(): void {
    let progress = setInterval(() => {
      this.progressStartValue++;

      this.progressEl.nativeElement.style.background = `conic-gradient(#00a75b ${
        this.progressStartValue * 3.6
      }deg, #07435E 0deg)`;

      if (this.progressStartValue == this.progressEndValue) {
        clearInterval(progress);
      }
    }, this.speed);
  }

  closePopup() {
    this.popup = false;
  }
}
