import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'crc-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.scss'],
})
export class PopupContainerComponent implements OnInit {
  @Input() openPopup!: boolean;
  @Output() openPopupChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.openPopup = false;
  }
}
