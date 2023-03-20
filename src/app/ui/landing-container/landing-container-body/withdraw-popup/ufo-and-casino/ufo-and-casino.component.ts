import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';

@Component({
  selector: 'crc-ufo-and-casino',
  templateUrl: './ufo-and-casino.component.html',
  styleUrls: ['./ufo-and-casino.component.scss'],
})
export class UfoAndCasinoComponent implements OnInit {
  @Input() data: any;
  @Output() displayPopupChange: EventEmitter<boolean> = new EventEmitter();
  constructor(private campaign: CampaignService) {}

  ngOnInit(): void {}
  getSpins() {
    this.campaign
      .cashout('bonus-shop-napoli-ticket', this.data.id)
      .subscribe((res) => {
        this.campaign.changeCongratPopupState({
          amount: this.data.amount,
          value: this.data.value,
          popuptype: this.data.popypType,
        });
        this.campaign.updateUserData.next(true);
      });
  }
}
