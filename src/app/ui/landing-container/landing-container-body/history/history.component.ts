import {Component} from '@angular/core';
import {CampaignService} from "../../../../services/campaign.service";

@Component({
  selector: 'crc-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  public items = [1, 1, 1, 1, 2, 2, 2, 2, 22, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,]

  constructor(private campaignService: CampaignService) {
    this.campaignService.getHistory().subscribe()
  }

}
