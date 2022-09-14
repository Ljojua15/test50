import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackdropService {
  public backDrop$ = new BehaviorSubject<boolean>(false);

  constructor() {}
}
