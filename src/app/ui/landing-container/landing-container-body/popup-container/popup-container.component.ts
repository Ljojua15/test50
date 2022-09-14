import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackdropService } from 'src/app/services/backdrop.service';

@Component({
  selector: 'crc-popup-container',
  templateUrl: './popup-container.component.html',
  styleUrls: ['./popup-container.component.scss'],
})
export class PopupContainerComponent implements OnInit {
  @Input() isBackdropClosable!: boolean;
  @Input() containerStyles!: Object;
  @Input() closeImage!: string;
  @Output() closePopup = new EventEmitter<boolean>();

  constructor(private backdropService: BackdropService) {}

  ngOnInit(): void {
    this.backdropService.isBackdropClosable$.next(this.isBackdropClosable);
  }

  onClose() {
    this.closePopup.emit(false);
    this.backdropService.backDrop$.next(false);
  }
}
