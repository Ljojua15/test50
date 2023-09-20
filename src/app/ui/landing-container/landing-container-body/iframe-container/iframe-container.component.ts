import {Component} from '@angular/core';
import {tabs} from "./config";
import {TranslateService} from "@ngx-translate/core";
import {CampaignService} from "../../../../services/campaign.service";
import {DomSanitizer} from "@angular/platform-browser";
import {IframeService} from "../../../../services/iframe.service";

@Component({
  selector: 'crc-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.scss']
})
export class IframeContainerComponent {
  public currentTab: number = 2
  public tabs = tabs

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private domSanitizer: DomSanitizer,
    private iframeService: IframeService
  ) {
    this.campaignService
      .getGameUrl('ka')
  }
}
