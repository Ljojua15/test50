import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'crc-choose-slot',
  templateUrl: './choose-slot.component.html',
  styleUrls: ['./choose-slot.component.scss'],
})
export class ChooseSlotComponent implements OnInit {
  @Output() displayPopupChange: EventEmitter<boolean> = new EventEmitter();

  totalAmount = 0;
  choosedSlotIndex!: number;
  currentAmount = 0;
  currentValue = 0;

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

  slots = [
    {
      id: 'zodiac_wheel',
      imgurl: 'zodiac-wheel-0.15',
      text: 'ZODIAC WHEEL',
      slotType: 'EGT',
      state: false,
      redirectUrl: 'ZODIAC WHEEL',
      value: 0.15,
      amount: 0,
    },
    {
      id: '10_burning_heart',
      imgurl: '10-burning-heart',
      text: '10 BURNING HEART',
      slotType: 'EGT',
      state: false,
      redirectUrl: '10 BURNING HEART',
      value: 0.5,
      amount: 0,
    },
    {
      id: '20_dazzling_hot',
      imgurl: '20-dazzling-hot',
      text: '20 DAZZLING HOT',
      slotType: 'EGT',
      state: false,
      redirectUrl: '20 DAZZLING HOT',
      value: 1,
      amount: 0,
    },
    {
      id: 'shining_crown',
      imgurl: 'shining-crown-2',
      text: 'SHINING CROWN',
      slotType: 'EGT',
      state: false,
      redirectUrl: 'SHINING CROWN',
      value: 2,
      amount: 0,
    },
    {
      id: 'gates_of_olympus_0_2',
      imgurl: 'gates-of-lympus-0.2',
      text: 'GATES OF OLYMPUS',
      slotType: 'PRAGMATIC',
      state: false,
      redirectUrl: 'Gates%20of%20Olympus™',
      value: 0.2,
      amount: 0,
    },
    {
      id: 'sweet_bonanza_0_4',
      imgurl: 'sweet-bonaza-0.4',
      text: 'SWEET BONAZA',
      slotType: 'PRAGMATIC',
      state: false,
      redirectUrl: 'Sweet%20Bonanza',
      value: 0.4,
      amount: 0,
    },
    {
      id: 'sweet_bonanza_1_8',
      imgurl: 'sweet-bonaza-1.8',
      text: 'SWEET BONAZA',
      slotType: 'PRAGMATIC',
      state: false,
      redirectUrl: 'Sweet%20Bonanza',
      value: 1.8,
      amount: 0,
    },
    {
      id: 'gates_of_olympus_0_8',
      imgurl: 'gates-of-lympus-0.8',
      text: 'GATES OF OLYMPUS',
      slotType: 'PRAGMATIC',
      state: false,
      redirectUrl: 'Gates%20of%20Olympus™',
      value: 0.8,
      amount: 0,
    },
  ];

  constructor(private campaign: CampaignService) {}

  getSpins() {
    this.campaign
      .cashout('bonus-shop-napoli-ticket', this.slots[this.choosedSlotIndex].id)
      .subscribe((res) => {
        const currentSlot = this.slots[this.choosedSlotIndex];
        this.campaign.congretsSubject.next({
          amount: this.currentAmount,
          value: this.currentValue,
          slotName: currentSlot.text,
          id: currentSlot.id,
          slotType: currentSlot.slotType,
          redirectUrl: currentSlot.redirectUrl,
          popuptype: 'SLOT',
        });
        this.campaign.updateUserData.next(true);
      });
  }

  changeSlot(i: number) {
    this.choosedSlotIndex = i;
    this.currentValue = this.slots[this.choosedSlotIndex].value;
    this.currentAmount = this.slots[this.choosedSlotIndex].amount;
  }

  ngOnInit(): void {}
}
