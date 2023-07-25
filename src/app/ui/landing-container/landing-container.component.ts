import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crc-landing-container',
  template: `
    <div class="main" [ngStyle]="styleObject()">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./landing-container.component.scss'],
})
export class LandingContainerComponent implements OnInit {
  filePath = environment.filePath;
  bgImg!: string;
  isMobile!: boolean;
  lang = 'en';

  constructor(
    private translateService: TranslateService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.updateBgImg();
    this.translateService.onLangChange.subscribe((lang) => {
      this.lang = lang.lang;
      this.updateBgImg();
    });
  }

  private updateBgImg(): void {
    this.isMobile = window.innerWidth <= 768;
    this.bgImg = this.isMobile
      ? `assets/images/bg-mob.webp`
      : `assets/images/bg.webp`;
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    console.log(this.isMobile);
    this.updateBgImg();
  }

  styleObject(): Object {
    return {
      'background-image': `url(${this.bgImg})`,
      // 'background-size': 'cover',
    };
  }
}
