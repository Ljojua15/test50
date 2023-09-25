import { AfterViewInit, Component, Input } from '@angular/core';
import { TabsService } from '../../../../../services/tabs.service';
import { GameID } from '../../iframe-container/config';
import { IframeService } from 'src/app/services/iframe.service';

@Component({
  selector: 'crc-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements AfterViewInit {
  @Input() card: any;

  constructor(
    private tabsService: TabsService,
    private iframe: IframeService
  ) {}

  changeTab(gameId: GameID) {
    this.tabsService.changeTab(gameId);
  }

  ngAfterViewInit(): void {}

  onClick() {
    this.iframe.scrollFromTop(1000);
  }
}
