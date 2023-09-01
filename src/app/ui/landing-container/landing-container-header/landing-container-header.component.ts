import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

@Component({
  selector: 'crc-landing-container-header',
  templateUrl: './landing-container-header.component.html',
  styleUrls: ['./landing-container-header.component.scss'],
})
export class LandingContainerHeaderComponent {
  headerUrl = this.translateService.onLangChange.pipe(
    map((lang) => `assets/images/bonus-header-${lang.lang}.webp`)
  );

  constructor(private translateService: TranslateService) {}
}
