import {Tab} from "../../../../shared/models/tab";

export const tabs: Tab[] = [
  {header: 'CHEST', amount: 10, text: 'MIN BET', gameId: 'chest', isCurrent: false},
  {header: 'WHEEL', amount: 10, text: 'MIN BET', gameId: 'wheel', isCurrent: true},
  {header: 'SPIN', amount: 10, text: 'MIN BET', gameId: 'masters', isCurrent: false},
]


export interface IframeData {
  iframeUrl: string | null
}


export interface changeTab {
  gameId: GameID,
  currentTabInd: number
}

export type  GameID = 'chest' | 'wheel' | 'masters'

export interface IframeTabsData {
  tabs: Tab[],
  iframeUrl: string | null
}


