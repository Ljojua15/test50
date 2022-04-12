import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class TranslateResolver implements Resolve<boolean> {

  constructor(private translateService: TranslateService) {
  }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const lang = route.paramMap.get('lang');
    if (lang) {
      this.translateService.use(lang)
    }
    return of(true);
  }
}
