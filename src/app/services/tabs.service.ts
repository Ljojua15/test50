import {Injectable} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CampaignService} from "./campaign.service";
import {DomSanitizer} from "@angular/platform-browser";
import {IframeService} from "./iframe.service";
import {AuthService} from "./auth.service";
import {BehaviorSubject, catchError, iif, map, Observable, of, switchMap} from "rxjs";
import {changeTab, GameID, IframeData} from "../ui/landing-container/landing-container-body/iframe-container/config";

@Injectable({
  providedIn: 'root'
})
export class TabsService {
  public iframeData$: Observable<IframeData>

  private $changeTabSubject: BehaviorSubject<changeTab | null> = new BehaviorSubject<changeTab | null>(null)
  public changeTab$: Observable<changeTab | null> = this.$changeTabSubject.asObservable()

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService,
    private domSanitizer: DomSanitizer,
    private iframeService: IframeService,
    private authService: AuthService,
  ) {
    this.iframeData$ = this.authService.isAuthorized().pipe(
      switchMap((res: any) =>
        iif(
          () => res,
          this.translateService.onLangChange.pipe(
            switchMap(resLang => {
              return this.campaignService.getGameUrl(resLang.lang).pipe(
                map((res) => {
                    res.url += `&language=${resLang.lang}`
                    return {
                      iframeUrl: this.domSanitizer.bypassSecurityTrustResourceUrl(res.url) as string
                    }
                  }
                )
              )
            })
          )
          ,
          of({
            iframeUrl: null
          })
        )
      ),
      catchError(() => of({
        iframeUrl: null
      }))
    );
  }

  changeTab(gameId: GameID) {

    this.$changeTabSubject.next({
      gameId: gameId,
      currentTabInd: gameId === 'chest' ? 0 : gameId === 'wheel' ? 1 : 2
    });
  }
}



