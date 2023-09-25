import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CampaignService} from "./campaign.service";
import {DomSanitizer} from "@angular/platform-browser";
import {IframeService} from "./iframe.service";
import {AuthService} from "./auth.service";
import {BehaviorSubject, catchError, combineLatest, iif, map, Observable, of, switchMap} from "rxjs";
import {
  changeTab,
  GameID,
  IframeData,
  IframeTabsData, tabs
} from "../ui/landing-container/landing-container-body/iframe-container/config";
import {Tab} from "../shared/models/tab";

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  public iframeTabsData$: Observable<IframeTabsData>

  private $changeTabSubject: BehaviorSubject<GameID | null> = new BehaviorSubject<GameID | null>(null)
  public changeTab$: Observable<GameID | null> = this.$changeTabSubject.asObservable()

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private domSanitizer: DomSanitizer,
    private iframeService: IframeService,
    private authService: AuthService,
  ) {
    this.iframeTabsData$ = combineLatest([
      this.authService.isAuthorized(),
      this.translateService.onLangChange
    ]).pipe(
      switchMap(([isAuthorized, lang]) => {
        console.log(isAuthorized, lang, 'change')
        if (isAuthorized) {
          return this.campaignService.getGameUrl(lang.lang).pipe(
            switchMap(gameResponse => {
              gameResponse.url += '&lang=en'
              console.log(gameResponse.url)
              const response: any = {
                iframeUrl: this.domSanitizer.bypassSecurityTrustResourceUrl(gameResponse.url) as string
              }
              return this.changeTab$.pipe(map(gameId => {
                if (gameId) {
                  tabs.forEach(tab => tab.isCurrent = tab.gameId === gameId)
                  this.changeGame(gameId)
                }
                response.tabs = tabs
                return response
              }))
            })
          )
        } else {
          tabs.forEach(tab => tab.isCurrent = tab.gameId === 'wheel')
          return of({
            tabs: tabs,
            iframeUrl: null
          })
        }
      })
    )
  }

  changeGame(gameId: GameID) {
    const iframe: any = document.getElementById('gameFrame')
    // console.log(iframe, 'iframe')
    iframe.contentWindow.postMessage(
      {
        action: 'changeGame',
        code: 1100,
        value: gameId,
        message: 'change game',
      },
      '*'
    );
  }

  changeTab(gameId: GameID) {
    this.$changeTabSubject.next(gameId);
  }
}



