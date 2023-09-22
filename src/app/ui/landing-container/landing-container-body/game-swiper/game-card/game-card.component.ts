import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { TabsService } from '../../../../../services/tabs.service';
import { GameID } from '../../iframe-container/config';

@Component({
  selector: 'crc-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements AfterViewInit {
  @Input() card: any;

  constructor(private tabsService: TabsService) {}

  changeTab(gameId: GameID) {
    this.tabsService.changeTab(gameId);
  }

  ngAfterViewInit(): void {}
}
