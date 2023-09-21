import {Component, HostListener, ViewChild} from '@angular/core';
import {tabs} from "./config";
import {TranslateService} from "@ngx-translate/core";
import {CampaignService} from "../../../../services/campaign.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {IframeService} from "../../../../services/iframe.service";
import {filter, of, tap} from "rxjs";

@Component({
  selector: 'crc-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.scss']
})
export class IframeContainerComponent {
  public currentTab: number = 2
  public tabs = tabs
  IframeUrl: any;
  @ViewChild('iframe') iframe: any;

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private domSanitizer: DomSanitizer,
    private iframeService: IframeService
  ) {

    this.campaignService
      .getGameUrl('en').subscribe(
      (res) => {
        this.IframeUrl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://bonus-space.crocobet.com/home/authtest?playerId=48362&token=dd7fd1c9-ce50-4556-af8f-e204451b56d3.oddsapi1&language=en')
      }
    )
  }

  changeTab(ind: number, gameId: 'wheel' | 'masters' | 'chest') {
    const iframe: any = document.getElementById('gameFrame')
    this.currentTab = ind
    console.log(iframe, gameId)
    iframe.contentWindow.postMessage(
      gameId,
      '*'
    );
  }


  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    of(event)
      .pipe(
        tap(res => {
          console.log(res)
        })
        // filter(
        //   (event) => event.origin === 'https://treasureisland.crocobet.com'
        // )
      )
      .subscribe((res) => {
        // if (res.data.message === 'CloseGame') {
        //   this.IframeUrl = '';
        //
        //   if (res.data.game) {
        //     this.iframeService.openNewTab(res.data.game);
        //   }
        //   this.closeIframe.emit();
        // }
      });
  }
}
