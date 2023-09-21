import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'crc-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements AfterViewInit {
  // @ViewChild('vid') video: any;
  @Input() video: string;
  @Input() name: string;

  ngAfterViewInit(): void {
    // this.video.play();
    // @ts-ignore: Unreachable code error
    // document?.getElementById('vid')?.play();
  }
}
