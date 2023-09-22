import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import {TabsService} from "../../../../../services/tabs.service";
import {GameID} from "../../iframe-container/config";

@Component({
  selector: 'crc-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements AfterViewInit {
  // @ViewChild('vid') video: any;
  @Input() card: any;


  constructor(private tabsService: TabsService) {
  }

  changeTab(gameId: GameID) {
    this.tabsService.changeTab(gameId)
  }

  ngAfterViewInit(): void {
    // this.video.play();
    // @ts-ignore: Unreachable code error
    // document?.getElementById('vid')?.play();
  }
}
