import {Component, HostListener, ViewChild} from '@angular/core';
import {changeTab, GameID, IframeData, tabs} from "./config";
import {TranslateService} from "@ngx-translate/core";
import {CampaignService} from "../../../../services/campaign.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {IframeService} from "../../../../services/iframe.service";
import {catchError, filter, iif, map, Observable, of, switchMap, tap} from "rxjs";
import {AuthService} from "../../../../services/auth.service";
import {TabsService} from "../../../../services/tabs.service";

@Component({
  selector: 'crc-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.scss']
})
export class IframeContainerComponent {
  public tabs = tabs
  @ViewChild('iframe') iframe: any;

  public iframeData$: Observable<IframeData>
  public changeTab$: Observable<changeTab>

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private domSanitizer: DomSanitizer,
    private iframeService: IframeService,
    private authService: AuthService,
    private tabsService: TabsService
  ) {
    this.iframeData$ = this.tabsService.iframeData$

    this.changeTab$ = this.tabsService.changeTab$.pipe(
      switchMap(res => {
          return this.authService.isAuthorized().pipe(
            map(isAuthorized => {
              if (res && isAuthorized) {
                const iframe: any = document.getElementById('gameFrame')
                iframe.contentWindow.postMessage(
                  {
                    action: 'changeGame',
                    code: 1100,
                    value: res.gameId,
                    message: 'change game',
                  },
                  '*'
                );
                return res
              }
              return {
                gameId: 'wheel',
                currentTabInd: 1
              } as changeTab
            })
          )
        }
      ))
  }

  changeTab(gameId: GameID) {
    this.tabsService.changeTab(gameId)
  }


  @HostListener('window:message', ['$event'])
  onMessage(event: MessageEvent) {
    of(event)
      .pipe(
        tap(res => {
          console.log(res)
        })
      )
      .subscribe((res) => {

      });
  }
}
