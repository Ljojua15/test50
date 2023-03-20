import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'crc-withdraw-popup',
  templateUrl: './withdraw-popup.component.html',
  styleUrls: ['./withdraw-popup.component.scss'],
})
export class WithdrawPopupComponent implements OnInit {
  constructor() {}

  cashOut: any = {};
  showWithdrawPopup = false;

  withdraw = [
    {
      id: 'slot_freespin',
      popypType: 'slot',
      canRedirect: true,
    },
    {
      id: 'evolution_balance',
      popypType: 'casino',
      canRedirect: false,
    },
    {
      id: 'ufo_freespin',
      popypType: 'ufo',
      canRedirect: false,
    },
  ];

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

  whichPopup: string = 'main';

  casinoData = {
    id: 'evolution_balance',
    texts: {
      headertextKey: 'casinokey.1',
      contenttextKey: 'casinokey.2',
    },
    headerImageUrl: 'casino-big',
    popypType: 'CASINO',
    amount: 0,
    value: 0,
    withdrawTextkey1: 'casinokey.3',
    withdrawTextkey2: 'casinokey.4',
  };

  ufoData = {
    id: 'ufo_freespin',
    texts: {
      headertextKey: 'ufokey.1',
      contenttextKey: 'ufokey.2',
    },
    headerImageUrl: 'slot-big',
    popypType: 'UFO',
    amount: 0,
    value: 0,
    withdrawTextkey1: 'ufokey.3',
    withdrawTextkey2: 'ufokey.4',
  };
  ngOnInit(): void {}
}
