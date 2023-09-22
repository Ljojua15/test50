import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {CampaignService} from "../../../../services/campaign.service";
import {DomSanitizer} from "@angular/platform-browser";
import {IframeService} from "../../../../services/iframe.service";
import {AuthService} from "../../../../services/auth.service";
import {map, Observable, tap} from "rxjs";
import {Leaderboard} from "../../../../shared/models/leaderboard";

@Component({
  selector: 'crc-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent {
  public arr = [1, 2, 3, 4, 5, 6, 7, 2, 4, 4, 4, 4, 4, 4]
  public leaderboardData$: Observable<{ leaderboardData: Leaderboard [], isSticky: boolean }>

  constructor(
    private translateService: TranslateService,
    private campaignService: CampaignService,
  ) {
    this.leaderboardData$ = this.campaignService.getLeaderBoard().pipe(map((res: any) => {
      const changedRes = {
        leaderboardData: res,
        isSticky: false
      }
      res.forEach((item: any) => item.itsMe ? item.place < 7 ? changedRes.isSticky = true : null : null)
      return changedRes
    }), tap(res => {
      console.log(res)
    }))
  }

}
