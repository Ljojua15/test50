import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'crc-landing-container-header',
  templateUrl: './landing-container-header.component.html',
  styleUrls: ['./landing-container-header.component.scss'],
})
export class LandingContainerHeaderComponent {
  headerUrl = this.translateService.onLangChange.pipe(
    map((lang) => `assets/images/${lang.lang}.png`)
  );
  isAuthorized = this.auth.isAuthorized();
  constructor(
    private translateService: TranslateService,
    private auth: AuthService
  ) {}
}
