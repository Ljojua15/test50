import {Injectable} from '@angular/core';
import {Rule} from "../models/rule";

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  title = {
    en : 'RULES:',
    ge : 'წესები:',
    ru : 'ПРАВИЛА:'
  }

  rules: Rule[] = [
    {
      en: {
        question: '',
        answer: ''
      },
      ge: {
        question: '',
        answer: ''
      },
      ru: {
        question: '',
        answer: ''
      }
    },
  ];

  additionalRules: Rule = {
    en: {
      question: '',
      answer: ''
    },
    ge: {
      question: '',
      answer: ''
    },
    ru: {
      question: '',
      answer: ''
    }
  }

  getRules(): Rule[] {
    return this.rules;
  }

  getAdditionRules() {
    return this.additionalRules;
  }

  getTitle() {
    return this.title;
  }

  constructor() {
  }
}
