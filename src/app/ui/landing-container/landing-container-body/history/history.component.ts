import {Component} from '@angular/core';
import {CampaignService} from "../../../../services/campaign.service";
import {HistoryService} from "../../../../services/history.service";
import {AuthService} from "../../../../services/auth.service";
import {iif, map, Observable, of, switchMap} from "rxjs";

export interface HistoryItem {
  date: string,
  amountAndValue: string,
  product: string
}

@Component({
  selector: 'crc-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  public historyData$: Observable<HistoryItem[] | null>;

  constructor(private historyService: HistoryService,
              private authService: AuthService,
              private campaignService: CampaignService) {
    this.historyData$ = this.authService.isAuthorized().pipe(
      switchMap((isAuthorized: boolean) =>
        iif(
          () => isAuthorized,
          this.historyService.historyRequest$.pipe(
            switchMap(() => {
              // return of(null);
              return this.campaignService.getHistory().pipe(
                switchMap((historyData: any) => {
                  // return of(null)
                  const mapHistoryData = this.mapHistoryData(historyData)
                  return this.historyService.openCloseHistoryPopup$.pipe(
                    map((action: boolean) => {
                      console.log('history', mapHistoryData)

                      return action ? mapHistoryData : null
                    })
                  )
                })
              )
            })
          ),
          of(null)
        )
      )
    );
  }

  openHistory() {
    this.historyService.changeHistoryPopupState(true)
  }

  closeHistory() {
    this.historyService.changeHistoryPopupState(false)
  }

  mapHistoryData(historyData: any): HistoryItem[] {
    return historyData.data.map((item: any) => {
        return {
          date: item.timestamp.slice(0, 10),
          amountAndValue: `${item.amount} X ${item.nominalAmount}`,
          product: item.nominalName
        }
      }
    )
  }

}
