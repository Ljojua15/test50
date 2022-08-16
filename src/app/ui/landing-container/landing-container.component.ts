import { Component, OnInit } from '@angular/core';

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

  bgImg = './../../../assets/images/bg.jpg';
  bgColor = '#0c1514';

  constructor() {}

  ngOnInit(): void {}
}
