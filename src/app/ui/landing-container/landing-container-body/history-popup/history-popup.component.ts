import { Component, EventEmitter, Output } from '@angular/core';
import { PlaceName } from 'src/app/app.module';

@Component({
  selector: 'crc-history-popup',
  templateUrl: './history-popup.component.html',
  styleUrls: ['./history-popup.component.scss'],
})
export class HistoryPopupComponent {
  historyPlace: PlaceName[] = [
    { place: 1, prize: '2 UFO FREESPIN' },
    { place: 2, prize: '2 UFO FREESPIN' },
    { place: 3, prize: '20  FREESPINS' },
    { place: 4, prize: '20  FREESPINS' },
    { place: 5, prize: '10  FREESPINS' },
    { place: 1, prize: '2 UFO FREESPIN' },
    { place: 2, prize: '2 UFO FREESPIN' },
    { place: 3, prize: '20  FREESPINS' },
    { place: 4, prize: '20  FREESPINS' },
    { place: 5, prize: '10  FREESPINS' },
  ];
  @Output() historyPo = new EventEmitter<void>();
}
