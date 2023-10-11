import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'crc-wheel-info',
  templateUrl: './wheel-info.component.html',
  styleUrls: ['./wheel-info.component.scss'],
})
export class WheelInfoComponent {
  @Output() closeWheelInfo = new EventEmitter<void>();
}
