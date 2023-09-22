import {Component, ElementRef, ViewChild} from '@angular/core';
import {TabsService} from "../../../../services/tabs.service";
import {GameID} from "../iframe-container/config";

type Cards = Array<{
  id: number;
  position: 'active' | 'left' | 'right';
  video: string;
  gameId: GameID
}>;

@Component({
  selector: 'crc-game-swiper',
  templateUrl: './game-swiper.component.html',
  styleUrls: ['./game-swiper.component.scss'],
})
export class GameSwiperComponent {
  @ViewChild('target') target: ElementRef;

  cards: Cards = [
    {id: 0, position: 'active', video: 'assets/videos/wheel.mp4', gameId: "wheel"},
    {id: 1, position: 'right', video: 'assets/videos/master.mp4', gameId: "masters"},
    {id: 2, position: 'left', video: 'assets/videos/viking.mp4', gameId: "chest"},
  ];
  selected = 0;


  onArrowClick(arrow: 'left' | 'right') {
    if (arrow === 'left') {
      this.selected--;

      if (this.selected < 0) {
        this.selected = this.cards.length - 1;
      }
    } else {
      this.selected++;
      if (this.selected > this.cards.length - 1) {
        this.selected = 0;
      }
    }

    this.cards.forEach((item) => {
      if (item.id === this.selected) {
        item.position = 'active';
      }

      if (this.selected - 1 < 0) {
        this.cards[2].position = 'left';
      } else if (item.id === this.selected - 1) {
        item.position = 'left';
      }

      if (this.selected + 1 > this.cards.length - 1) {
        this.cards[0].position = 'right';
      } else if (item.id === this.selected + 1) {
        item.position = 'right';
      }
    });
  }
}
