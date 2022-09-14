import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'crc-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.scss'],
})
export class PopupContainerComponent {
  @Input() containerStyles!: Object;
  @Input() closeImage!: string;
  @Input() openPopup!: boolean;
  @Output() openPopupChange = new EventEmitter<boolean>();

  onClose() {
    this.openPopupChange.emit(false);
  }
}
