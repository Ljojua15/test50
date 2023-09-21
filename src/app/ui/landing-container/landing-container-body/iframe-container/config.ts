import {Tab} from "../../../../shared/models/tab";

export const tabs: Tab[] = [
  {header: 'CHEST', amount: 10, text: 'MIN BET', gameId: 'chest'},
  {header: 'WHEEL', amount: 10, text: 'MIN BET', gameId: 'wheel'},
  {header: 'SPIN', amount: 10, text: 'MIN BET', gameId: 'masters'},

]


export interface IframeData {
  iframeUrl: string | null
}


export interface changeTab {
  gameId: GameID,
  currentTabInd: number
}

export type GameID = 'chest' | 'wheel' | 'masters'


