import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CashOut } from '../shared/models/cashout';
import { CongratPopupData } from '../shared/models/congratPopupData';

@Injectable({
  providedIn: 'root',
})
export class WithdrawPopupService {
  private $showWithdrawPopupSubject = new BehaviorSubject<CashOut | boolean>(
    false
  );
  private $showCongratPopupSubject = new BehaviorSubject<
    CongratPopupData | boolean
  >(false);

  public showWithdrawPopup$ = this.$showWithdrawPopupSubject.asObservable();
  public showCongratPopup$ = this.$showCongratPopupSubject.asObservable();

  changeWithdrawPopupState(value: CashOut | boolean) {
    this.$showWithdrawPopupSubject.next(value);
  }

  changeCongratPopupState(value: CongratPopupData | boolean) {
    this.$showCongratPopupSubject.next(value);
  }
}
