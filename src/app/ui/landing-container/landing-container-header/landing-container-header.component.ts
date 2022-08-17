import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'crc-landing-container-header',
  templateUrl: './landing-container-header.component.html',
  styleUrls: ['./landing-container-header.component.scss'],
})
export class LandingContainerHeaderComponent {
  filePath = environment.filePath;

  //header image url
  headerUrl = this.translateService.onLangChange.pipe(
    map((lang) => `./../../${this.filePath}assets/images/${lang.lang}.png`)
  );

  constructor(private translateService: TranslateService) {}
}
