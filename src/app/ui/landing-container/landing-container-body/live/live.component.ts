import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription, switchMap, timer } from 'rxjs';
import { CampaignService } from 'src/app/services/campaign.service';
import { IframeService } from 'src/app/services/iframe.service';
import { TimerService } from 'src/app/services/timer.service';

enum PopupState {
  Render = 'render',
  Flat = 'flat',
}

const openClose = trigger('openClose', [
  state(
    'open',
    style({
      height: '*',
    })
  ),
  state(
    'close',
    style({
      height: 0,
    })
  ),
  transition('open => close', [animate('0.3s ease-out')]),
  transition('close => open', [animate('0.3s ease-in')]),
]);

const spinArrow = trigger('spinArrow', [
  state(
    'open',
    style({
      transform: 'rotate(180deg)',
    })
  ),
  state(
    'close',
    style({
      transform: 'rotate(0deg)',
    })
  ),
  transition('open => close', [animate('0.3s ease-out')]),
  transition('close => open', [animate('0.3s ease-in')]),
]);

@Component({
  selector: 'crc-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  animations: [openClose, spinArrow],
})
export class LiveComponent implements OnInit {
  @ViewChild('bonusPopup') bonusPopup!: ElementRef;
  @ViewChild('videoPopup') videoPopup!: ElementRef;

  @Input() isAuthorized: boolean = false;

  recentVideoUrl = 'https://www.youtube.com/embed/5Xq8SfzAE_s';
  liveUrl = '';
  showRecentVideo = false;
  isLive = false;
  dropVideo = false;
  disableBtn = true;
  streams: any;
  openInfo = false;
  showAuthError = false;
  showPrize = false;
  showMinTicketError = false;
  showSubmited = false;
  showOutOfRangeError = false;
  questionId!: number;
  prizeAmount = 'X';
  nextLive = '';
  slotUrl =
    'https://crocobet.com/#/slots/play?slot=10%20Burning%20Heart&provider=egt&filter=egt';
  slotImg = 'zodiac.png';

  activeQuestionSubscription$ = new Subscription();

  timer = {
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  constructor(
    private iframeService: IframeService,
    private timerService: TimerService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.getUrl();
    let msAfterLastLive: boolean = this.timerService.checkLastLive();

    if (msAfterLastLive) {
      this.checkLive();
      this.checkActiveQuestion();
    } else {
      this.timerSub();
    }
  }

  checkActiveQuestion() {
    this.activeQuestionSubscription$ = timer(0, 2000)
      .pipe(switchMap(() => this.campaignService.getActiveButton()))
      .subscribe((questionId: number) => {
        if (!!questionId) {
          this.questionId = questionId;
          this.disableBtn = false;
          this.activeQuestionSubscription$.unsubscribe();
        }
      });
  }

  checkLive() {
    let timer$ = timer(100, 10000)
      .pipe(switchMap(() => this.campaignService.getLiveUrl()))
      .subscribe((res) => {
        if (res.data === null) {
          timer$.unsubscribe();
          this.timerSub();
          this.liveUrl = '';

          this.disableBtn = true;
          this.activeQuestionSubscription$.unsubscribe();
          return;
        }

        this.liveUrl = res.data.twitchUrl;
        const iframeSrc = `${res.data.twitchUrl}?autoplay=1&mute=1`;
        this.liveUrl = iframeSrc;

        // this.scrollToLive();
        this.dropVideo = true;
      });
  }

  timerSub() {
    let timer$ = this.timerService.countdown$().subscribe((count: any) => {
      if (count.hours === 0 && count.minutes === 0 && count.seconds === 0) {
        this.checkLive();
        this.checkActiveQuestion();
        timer$.unsubscribe();
      }
      this.timer = {
        hours: count.hours.toString().padStart(2, '0'),
        minutes: count.minutes.toString().padStart(2, '0'),
        seconds: count.seconds.toString().padStart(2, '0'),
      };
    });
  }

  closeRecentVideo() {
    this.showRecentVideo = false;
    document.body.style.overflow = 'visible';
  }

  onInfoOpen() {
    this.openInfo = true;
    setTimeout(() => {
      this.bonusPopup.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    });
  }

  toggleVideoDrop() {
    this.dropVideo = !this.dropVideo;
  }

  onRegister() {
    this.iframeService.register();
  }

  onLogin() {
    this.iframeService.login();
  }

  openRecentVideo(i: number) {
    this.showRecentVideo = true;
    this.recentVideoUrl = this.streams[i].twitchUrl;
    this.videoPopup.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });

    document.body.style.overflow = 'hidden';
  }

  //gasuli gatamasebebis linkebi
  getUrl() {
    this.campaignService.getLiveStreams().subscribe((res: any) => {
      res.data.forEach((item: any) => {
        if (item.schedule.length === 0) {
          item.schedule = 'autumn_raffle';
          return;
        } else {
          const d = new Date(item.schedule);
          item.schedule = `${d.getDate() < 10 ? 0 : ''}${d.getDate()}.${
            d.getUTCMonth() + 1
          }.${d.getUTCFullYear()}`;
        }
      });

      this.streams = res.data;
    });
  }

  onAuthErrorClose() {
    this.showAuthError = false;
  }

  onInfoClose() {
    this.openInfo = false;
  }

  onPrizeClose() {
    this.showPrize = false;
  }

  onMinTicketErrorClose() {
    this.showMinTicketError = false;
  }

  onSubmitedClose() {
    this.showSubmited = false;
  }

  onOutOfRangeErrorClose() {
    this.showOutOfRangeError = false;
  }

  submitAnswer() {
    if (!this.isAuthorized) {
      this.showAuthError = true;
      return;
    }

    this.campaignService
      .submitAnswer('live-tv-drawing-211222-v2', this.questionId.toString())
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            if (res.data.correct) {
              if (res.data.prize) {
                if (!res.data.prize.amount) {
                  this.showMinTicketError = true;
                } else {
                  this.prizeAmount =
                    res.data.prize.amount > 500 ? 500 : res.data.prize.amount;
                  this.showPrize = true;
                  this.disableBtn = true;
                }
              } else {
                //this.showLate = true;
              }
            } else {
              if (this.prizeAmount === 'X') {
                this.showMinTicketError = true;
                this.disableBtn = true;
              }
            }
          }
        },
        error: (e) => {
          if (
            e.error &&
            e.error.message.toString() === 'ANSWER_ALREADY_SUBMITTED'
          ) {
            this.campaignService
              .getTicketStatus(
                'live-tv-drawing-181122',
                this.questionId.toString()
              )
              .subscribe((res: any) => {
                this.showSubmited = res.data.correct;
                this.showMinTicketError = !this.showSubmited;
                this.disableBtn = true;
              });
          }
        },
      });
  }
}
