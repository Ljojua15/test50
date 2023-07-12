import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RulesService {
  title = {
    en: 'RULES:',
    ge: 'წესები:',
    ru: 'ПРАВИЛА:',
  };

  getTitle() {
    return this.title;
  }
}
