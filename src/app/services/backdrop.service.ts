import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackdropService {
  public backDrop$ = new BehaviorSubject<boolean>(false);
  public isBackdropClosable$ = new Subject<boolean>();

  constructor() {}
}
