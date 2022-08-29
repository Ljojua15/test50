import { Component } from '@angular/core';
import { IframeService } from 'src/app/services/iframe.service';

@Component({
  selector: 'crc-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
})
export class SlotsComponent {
  slots = [
    {
      name: 'ZODIAC WHEEL',
      imageUrl: './../../../../../assets/images/slots/zodiac.png',
      bgColor: '#2320c0',
      cost: '0.15',
    },
    {
      name: '10 BURNING HEART',
      imageUrl: './../../../../../assets/images/slots/10-burning.png',
      bgColor: '#e30d21',
      cost: '0.5',
    },
    {
      name: '20 DAZZLING HOT',
      imageUrl: './../../../../../assets/images/slots/20-dazzling.png',
      bgColor: '#47a129',
      cost: '1',
    },
    {
      name: 'SHINING CROWN',
      imageUrl: './../../../../../assets/images/slots/crown.png',
      bgColor: '#ae9313',
      cost: '2',
    },
    {
      name: '81 WINS',
      imageUrl: './../../../../../assets/images/slots/81-wins.png',
      bgColor: '#128cc5',
      cost: '5',
    },
  ];

  constructor(private iframeService: IframeService) {}

  onClick(url: string) {
    this.iframeService.redirectToSlot(url);
  }
}
