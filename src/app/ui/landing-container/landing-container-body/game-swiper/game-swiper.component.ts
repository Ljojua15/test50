import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameID } from '../iframe-container/config';

type Cards = Array<{
  id: number;
  position: 'active' | 'left' | 'right';
  video: string;
  gameId: GameID;
  bet: number;
  key: string;
}>;

@Component({
  selector: 'crc-game-swiper',
  templateUrl: './game-swiper.component.html',
  styleUrls: ['./game-swiper.component.scss'],
})
export class GameSwiperComponent {
  @ViewChild('target') target: ElementRef;

  cards: Cards = [
    {
      id: 0,
      position: 'active',
      video: 'assets/videos/wheel.mp4',
      gameId: 'wheel',
      key: 'croco-master',
      bet: 5,
    },
    {
      id: 1,
      position: 'right',
      video: 'assets/videos/master.mp4',
      gameId: 'masters',
      key: 'sakura-wheel',
      bet: 1,
    },
    {
      id: 2,
      position: 'left',
      video: 'assets/videos/viking.mp4',
      gameId: 'chest',
      key: 'viking-treasure',
      bet: 1,
    },
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
