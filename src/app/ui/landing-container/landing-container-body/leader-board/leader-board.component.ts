import {Component} from '@angular/core';

@Component({
  selector: 'crc-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent {
  public arr = [1, 2, 3, 4, 5, 6, 7, 2, 4, 4, 4, 4, 4, 4]

  constructor() {
  }


}
