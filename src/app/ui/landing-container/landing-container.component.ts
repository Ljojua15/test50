import { Component } from '@angular/core';

@Component({
  selector: 'crc-landing-container',
  template: `
    <div class="main" [ngStyle]="styleObject()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./landing-container.component.scss'],
})
export class LandingContainerComponent {
  styleObject(): Object {
    return {
      'background-image': 'url(' + this.bgImg + ')',
    };
  }

  bgImg = `assets/iimages/mb-bg.webp`;
}
