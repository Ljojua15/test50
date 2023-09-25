import { Component, Input } from '@angular/core';
import { TabsService } from '../../../../../services/tabs.service';
import { IframeService } from 'src/app/services/iframe.service';

@Component({
  selector: 'crc-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent {
  @Input() card: any;

  constructor(
    private tabsService: TabsService,
    private iframe: IframeService
  ) {}

  onPlay() {
    this.tabsService.changeTab(this.card.gameId);
    this.iframe.scrollFromTop(1000);
  }
}
