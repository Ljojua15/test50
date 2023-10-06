import {Component, HostListener, ViewChild} from '@angular/core';
import {changeTab, GameID, IframeData, IframeTabsData, tabs} from "./config";
import {TranslateService} from "@ngx-translate/core";
import {CampaignService} from "../../../../services/campaign.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {IframeService} from "../../../../services/iframe.service";
import {catchError, filter, iif, map, Observable, of, switchMap, tap} from "rxjs";
import {AuthService} from "../../../../services/auth.service";
import {TabsService} from "../../../../services/tabs.service";
import {HistoryService} from "../../../../services/history.service";

@Component({
  selector: 'crc-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.scss']
})
export class IframeContainerComponent {
  public iframeTabsData$: Observable<IframeTabsData>
  public reload = true

  constructor(
    private tabsService: TabsService, private historyService: HistoryService
  ) {
    this.iframeTabsData$ = this.tabsService.iframeTabsData$.pipe(tap(res => {
      // console.log(res, 'in subscribe')
    }))
  }

  changeTab(gameId: GameID) {
    this.tabsService.changeTab(gameId)
  }


  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    // console.log(event, 'eveeeeeeeeeeeeeeeeent')
    if (event.origin === 'https://bonus-space.crocobet.com') {
      if (event.data.message === 'CloseGame') {
        window.open(event.data.gameUrl)
        this.historyService.makeRequest();
      } else if (event.data === 'reloadGame') {
        this.reload = false
        setTimeout(() => {
          this.reload = true
        }, 500)
      }
    }
  }
}