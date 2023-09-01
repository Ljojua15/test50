import {Component, HostListener} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'crc-landing-container',
  template: `
    <div class="main" [ngStyle]="{ 'background-image': 'url(' + bgImg + ')' }">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./landing-container.component.scss'],
})
export class LandingContainerComponent {
  lang!: string;

  generateBackgroundUrl(): void {
    const isMobile = window.innerWidth < 768 ? 'mob' : 'web';
    this.bgImg = `./assets/images/backgrounds/bg-${isMobile}-${this.lang}.webp`;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: { target: { innerWidth: any } }) {
    this.generateBackgroundUrl();
  }


  //main background image
  bgImg!: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe((lang) => {
      this.lang = lang.lang == 'ka' ? 'ge' : lang.lang;
      this.generateBackgroundUrl();
    });
  }
}
