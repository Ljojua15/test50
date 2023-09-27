import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private $makeHistoryRequestSubject: Subject<null> = new BehaviorSubject(null);
  public historyRequest$ = this.$makeHistoryRequestSubject.asObservable()
  private $openCloseHistoryPopupSubject: Subject<boolean> = new BehaviorSubject(false);
  public openCloseHistoryPopup$ = this.$openCloseHistoryPopupSubject.asObservable()

  constructor() {
  }

  changeHistoryPopupState(action: boolean) {
    this.$openCloseHistoryPopupSubject.next(action)
  }

  makeRequest() {
    this.$makeHistoryRequestSubject.next(null)
  }
}
