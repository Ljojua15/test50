import { Component, Input, OnInit } from '@angular/core';
import { WithdrawPopupService } from 'src/app/services/withdraw-popup.service';
import { CashOut } from 'src/app/shared/models/cashout';
import { casinoData, ufoData, withdraw } from './withdraw-config';

@Component({
  selector: 'crc-withdraw-popup',
  templateUrl: './withdraw-popup.component.html',
  styleUrls: ['./withdraw-popup.component.scss'],
})
export class WithdrawPopupComponent {
  public cashOut!: CashOut;
  public showWithdrawPopup = false;
  public whichPopup: string = 'main';
  public casinoData = casinoData;
  public ufoData = ufoData;
  public withdraw = withdraw;

  constructor(private withdrawPopupService: WithdrawPopupService) {}

  @Input() set cashOutSetter(res: any) {
    this.showWithdrawPopup = !!res.exchangeOptions.length;
    this.cashOut = res;
    res.exchangeOptions.forEach((item: any) => {
      if (item.id === 'ufo_freespin') {
        this.ufoData.amount = item.amount;
        this.ufoData.value = item.value;
      } else if (item.id === 'evolution_balance') {
        this.casinoData.amount = item.amount;
        this.casinoData.value = item.value;
      }
      this.withdraw.forEach((slot) => {
        if (slot.id === item.id) {
          slot.canRedirect = true;
        }
      });
    });
  }

  closePupup() {
    this.withdrawPopupService.changeWithdrawPopupState(false);
  }
}
