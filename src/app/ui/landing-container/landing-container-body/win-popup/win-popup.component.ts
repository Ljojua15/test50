import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'crc-win-popup',
  templateUrl: './win-popup.component.html',
  styleUrls: ['./win-popup.component.scss'],
})
export class WinPopupComponent {
  @Output() closeName = new EventEmitter<void>();
}
