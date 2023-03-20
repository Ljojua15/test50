import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { WithdrawPopupService } from 'src/app/services/withdraw-popup.service';

@Component({
  selector: 'crc-ufo-and-casino',
  templateUrl: './ufo-and-casino.component.html',
  styleUrls: ['./ufo-and-casino.component.scss'],
})
export class UfoAndCasinoComponent {
  @Input() data: any;
  @Output() displayPopupBack: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private withdrawPopupService: WithdrawPopupService,
    private campaignService: CampaignService
  ) {}

  cashout() {
    this.campaignService
      .cashout('bonus-shop-napoli-ticket', this.data.id)
      .subscribe((res) => {
        this.withdrawPopupService.changeCongratPopupState({
          amount: this.data.amount,
          value: this.data.value,
          popuptype: this.data.popypType,
        });
        this.campaignService.updateUserData.next(true);
      });
  }
}
