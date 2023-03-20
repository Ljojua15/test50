import { Component, Input, OnInit } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { IframeService } from 'src/app/services/iframe.service';
import { WithdrawPopupService } from 'src/app/services/withdraw-popup.service';

@Component({
  selector: 'crc-congrat-popup',
  templateUrl: './congrat-popup.component.html',
  styleUrls: ['./congrat-popup.component.scss'],
})
export class CongratPopupComponent {
  @Input() data = {
    amount: 0,
    value: 0,
    slotName: '81 wins',
    id: 'gates_of_olympus_6_0',
    slotType: 'PRAGMATIC',
    redirectUrl: 'Gates%20of%20Olympus™',
    popuptype: 'SLOT',
  };

  constructor(
    private iframeService: IframeService,
    private withdrawPopupService: WithdrawPopupService
  ) {}

  redirectToSlot() {
    if (this.data.popuptype === 'SLOT') {
      this.iframeService.redirectToSlot(
        this.data.redirectUrl,
        this.data.slotType === 'EGT' ? 'egt' : 'TPG@bet-construct'
      );
    } else if (this.data.popuptype === 'CASINO') {
      window.open(
        `https://crocobet.com/#/casino/play?casino=FreeChips%20Lobby&provider=evolution@evolution&game_id=evofreespin0001&filter=other`
      );
    } else {
      window.open(
        `https://crocobet.com/#/${this.data.popuptype.toLowerCase()}`
      );
    }
  }

  closePupup() {
    this.withdrawPopupService.changeCongratPopupState(false);
  }
}
