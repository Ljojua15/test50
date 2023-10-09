import { Component } from '@angular/core';

@Component({
  selector: 'crc-accordion',
  template: `
    <div>
      <ng-content select="crc-accordion-item"></ng-content>
    </div>
  `,
  styles: ['div { width: 100%; margin-bottom: 6px; margin-top:250px}'],
})
export class AccordionComponent {}
