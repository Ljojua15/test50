import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crc-landing-container',
  templateUrl: './landing-container.component.html',
  styleUrls: ['./landing-container.component.scss'],
})
export class LandingContainerComponent implements OnInit {
  styleObject(): Object {
    return {
      'background-image': 'url(' + this.bgImg + ')',
      'background-color': this.bgColor,
    };
  }

  filePath = environment.filePath;

  //main background image
  bgImg = `../../${this.filePath}assets/images/bg.jpg`;

  //main background color
  bgColor = '#0c1514';

  constructor() {}

  ngOnInit(): void {}
}
