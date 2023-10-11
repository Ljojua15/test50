import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'crc-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss'],
})
export class InfoPopupComponent {
  @Output() closeName = new EventEmitter<void>();
}
