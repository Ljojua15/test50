import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { WithdrawPopupService } from 'src/app/services/withdraw-popup.service';
import { slots } from '../withdraw-config';

@Component({
  selector: 'crc-choose-slot',
  templateUrl: './choose-slot.component.html',
  styleUrls: ['./choose-slot.component.scss'],
})
export class ChooseSlotComponent {
  public totalAmount = 0;
  public choosedSlotIndex!: number;
  public currentAmount = 0;
  public currentValue = 0;
  public slots = slots;

  constructor(
    private withdrawPopupService: WithdrawPopupService,
    private campaignService: CampaignService
  ) {}

  @Output() displayPopupBack: EventEmitter<boolean> = new EventEmitter();
  @Input() set cashOut(res: any) {
    this.totalAmount = res.totalAmount;
    this.slots.forEach((item) => {
      res.exchangeOptions.forEach((exchange: any) => {
        if (item.id == exchange.id) {
          item.state = true;
          item.amount = exchange.amount;
        }
      });
    });
  }

  cashout() {
    this.campaignService
      .cashout('bonus-shop-napoli-ticket', this.slots[this.choosedSlotIndex].id)
      .subscribe(() => {
        const currentSlot = this.slots[this.choosedSlotIndex];
        this.withdrawPopupService.changeCongratPopupState({
          amount: this.currentAmount,
          value: this.currentValue,
          slotName: currentSlot.text,
          id: currentSlot.id,
          slotType: currentSlot.slotType,
          redirectUrl: currentSlot.redirectUrl,
          popuptype: 'SLOT',
        });
        this.campaignService.updateUserData.next(true);
      });
  }

  changeSlot(i: number) {
    this.choosedSlotIndex = i;
    this.currentValue = this.slots[this.choosedSlotIndex].value;
    this.currentAmount = this.slots[this.choosedSlotIndex].amount;
  }
}
