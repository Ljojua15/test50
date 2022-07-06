import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FinalData } from '../user';

@Component({
  selector: 'app-final-tickets',
  templateUrl: './final-tickets.component.html',
  styleUrls: ['./final-tickets.component.scss'],
})
export class FinalTicketsComponent implements OnInit {
  @Input() userData!: FinalData;
  @Input() progress: any;

  test = 90;

  constructor() {}

  ngOnInit(): void {}

  showLeftProgress = false;
  showRightProgress = false;
  openPopup = false;
  color: string = 'red';

  filePath = environment.filePath;

  changeStyle($event: Event) {
    // this.color = $event.type == 'mouseover' ? 'yellow' : 'red';
    // this.color = $event.type == 'mouseover' ? 'yellow' : 'red';
    this.showLeftProgress = $event.type === 'mouseover' ? true : false;
  }

  openFinalPopup() {
    this.openPopup = true;
  }

  closePopup() {
    this.openPopup = false;
  }
}
