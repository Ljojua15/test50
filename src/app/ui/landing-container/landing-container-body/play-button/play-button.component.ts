import {Component, Input} from '@angular/core';
import {IframeService} from 'src/app/services/iframe.service';

@Component({
  selector: 'crc-play-button',
  templateUrl: './play-button.component.html',
  styleUrls: ['./play-button.component.scss'],
})
export class PlayButtonComponent {
  @Input() hasAnimation = false;

  redirectUrl = 'https://crocobet.com/#/';

  constructor(private iframeService: IframeService) {
  }

  onClick() {
    this.iframeService.openNewTab(this.redirectUrl);
  }
}
