import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackdropService } from 'src/app/services/backdrop.service';

@Component({
  selector: 'crc-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.scss'],
})
export class PopupContainerComponent {
  @Input() containerStyles!: Object;
  @Input() closeImage!: string;
  @Output() closePopup = new EventEmitter<boolean>();

  constructor(private backdropService: BackdropService) {}

  onClose() {
    this.closePopup.emit(false);
    this.backdropService.backDrop$.next(false);
  }
}
