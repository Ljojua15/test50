import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'crc-landing-container-header',
  templateUrl: './landing-container-header.component.html',
  styleUrls: ['./landing-container-header.component.scss'],
})
export class LandingContainerHeaderComponent implements OnInit {
  headerUrl = './../../../../assets/images/en.png';

  constructor() {}

  ngOnInit(): void {}
}
