import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-win-popup',
  templateUrl: './win-popup.component.html',
  styleUrls: ['./win-popup.component.scss'],
})
export class WinPopupComponent implements OnInit {
  @Input() displayPopup: boolean = false;
  @Output() displayPopupChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onClose() {
    this.displayPopupChange.emit(false);
  }
}
