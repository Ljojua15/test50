import {Tab} from "../../../../shared/models/tab";

export const tabs: Tab[] = [
  {header: 'CHEST', amount: 1, text: 'MIN BET', gameId: 'chest', isCurrent: false, translateKey: "viking-treasure"},
  {header: 'SPIN', amount: 1, text: 'MIN BET', gameId: 'masters', isCurrent: true, translateKey: "croco-master"},
  {header: 'WHEEL', amount: 5, text: 'MIN BET', gameId: 'wheel', isCurrent: false, translateKey: "sakura-wheel"},
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


