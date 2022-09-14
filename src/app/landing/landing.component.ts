import { Component, OnInit } from '@angular/core';
import { Rule } from '../shared/models/rule';
import { RulesService } from '../services/rules.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { BackdropService } from '../services/backdrop.service';

@Component({
  selector: 'crc-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  isAuthorized = false;

  backdrop$: Observable<boolean> | null = null;
  isBackdropClosable!: boolean;

  title: {
    en: string;
    ge: string;
    ru: string;
  } | null = null;
  rules: Rule[] = [];
  additionalRules: Rule | null = null;
  lang: 'en' | 'ge' | 'ru' = 'ge';

  constructor(
    private rulesService: RulesService,
    private translateService: TranslateService,
    private authService: AuthService,
    private backdropService: BackdropService
  ) {}

  ngOnInit(): void {
    this.lang = this.getCurrentLang();
    this.title = this.rulesService.getTitle();
    this.checkToken();
    this.backdrop$ = this.backdropService.backDrop$.asObservable();
    this.backdropService.isBackdropClosable$.subscribe(
      (res: boolean) => (this.isBackdropClosable = res)
    );
  }

  checkToken() {
    return this.authService.isAuthorized().subscribe((res: any) => {
      this.isAuthorized = res;
    });
  }

  getCurrentLang() {
    return this.translateService.currentLang === 'en'
      ? 'en'
      : this.translateService.currentLang === 'ru'
      ? 'ru'
      : 'ge';
  }

  onClose() {
    if (this.isBackdropClosable) {
      this.backdropService.backDrop$.next(false);
    }
  }
}
