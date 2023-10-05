import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  private shareStatus$ = new BehaviorSubject<boolean>(false);
  sendUpdate(message: boolean) {
    this.shareStatus$.next(message);
  }

  getUpdate(): Observable<boolean> {
    return this.shareStatus$.asObservable();
  }
  constructor() {}
}
