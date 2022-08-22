import { Component } from '@angular/core';
import { IframeService } from 'src/app/services/iframe.service';

@Component({
  selector: 'crc-play-btn',
  templateUrl: './play-btn.component.html',
  styleUrls: ['./play-btn.component.scss'],
})
export class PlayBtnComponent {
  // redirect url on button click
  redirectUrl = 'https://crocobet.com/#/';

  constructor(private iframeService: IframeService) {}

  onClick() {
    this.iframeService.openNewTab(this.redirectUrl);
  }
}
