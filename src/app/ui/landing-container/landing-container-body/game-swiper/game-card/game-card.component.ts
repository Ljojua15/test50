import { Component, Input, OnInit } from '@angular/core';
import { TabsService } from '../../../../../services/tabs.service';
import { IframeService } from 'src/app/services/iframe.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'crc-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss'],
})
export class GameCardComponent implements OnInit {
  @Input() card: any;

  isAuthorized = false;

  constructor(
    private tabsService: TabsService,
    private iframe: IframeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkToken();
  }

  onPlay() {
    this.tabsService.changeTab(this.card.gameId);

    if (window.innerWidth <= 479) {
      this.iframe.scrollFromTop(700);
    } else {
      this.iframe.scrollFromTop(800);
    }
  }

  checkToken() {
    return this.authService.isAuthorized().subscribe((res) => {
      this.isAuthorized = res;
    });
  }
}
