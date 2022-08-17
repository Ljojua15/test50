import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crc-landing-container-header',
  templateUrl: './landing-container-header.component.html',
  styleUrls: ['./landing-container-header.component.scss'],
})
export class LandingContainerHeaderComponent implements OnInit {
  filePath = environment.filePath;

  headerUrl = `./../../${this.filePath}assets/images/en.png`;

  constructor() {}

  ngOnInit(): void {}
}
