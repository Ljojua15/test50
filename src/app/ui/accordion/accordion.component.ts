import { Component } from '@angular/core';

@Component({
  selector: 'crc-accordion',
  template: `
    <div>
      <ng-content select="crc-accordion-item"></ng-content>
    </div>
  `,
  styles: ['div { width: 100%; margin-bottom: 6px; }'],
})
export class AccordionComponent {}
