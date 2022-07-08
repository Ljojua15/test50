import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Rule } from '../models/rule';
import { RulesService } from '../services/rules.service';
import { TranslateService } from '@ngx-translate/core';
import { LatencyTestService } from '../services/latency-test.service';
import { IframeService } from '../services/iframe.service';
import { interval, of, switchMap, takeUntil, timer } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CampaignService } from '../services/campaign.service';
import { DailyData, FinalData } from './user';
import { countdown$ } from './utils';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  // @ViewChild('test2') testing: any;

  component: 'daily' | 'final' = 'final';
  isAuthorized: boolean = false;
  totalDaily: number = 0;
  openInfo = false;
  isLive = false;
  showRecentVideo = false;
  recentVideoUrl = 'https://www.youtube.com/embed/5Xq8SfzAE_s';
  streams: any;
  callFunction = true;
  disableBtn = true;
  questionId!: number;
  answer = 'crc';
  showPrize = false;
  liveUrl = '';

  filePath = environment.filePath;

  timer = {
    hours: '00',
    minutes: '00',
    seconds: '00',
  };

  progress = {
    depositProgress: 0,
    betProgress: 0,
  };

  finalData: FinalData = {
    total: 0,
    bet: 0,
    deposit: 0,
    betProgress: 0,
    depositProgress: 0,
  };

  dailyData: DailyData = {
    total: 0,
    bet: 0,
    deposit: 0,
    login: 0,
    verification: 0,
  };

  title: {
    en: string;
    ge: string;
    ru: string;
  } | null = null;
  rules: Rule[] = [];
  additionalRules: Rule | null = null;
  lang: 'en' | 'ge' | 'ru' = 'ge';

  constructor(
    private rulesService: RulesService,
    private translateService: TranslateService,
    private latencyTestService: LatencyTestService,
    private iframeService: IframeService,
    private authService: AuthService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    this.setTimer();
    this.component = 'daily';
    this.lang = this.getCurrentLang();
    this.title = this.rulesService.getTitle();
    this.getRules();
    this.checkUser();
    this.getUrl();
    this.getfinalData();
  }

  setTicket(e: any) {
    this.totalDaily = e;
  }

  getTab(tab: 'daily' | 'final') {
    this.component = tab;
  }

  openModal() {
    this.openInfo = true;
  }

  closeModal() {
    this.openInfo = false;
  }

  openRecentVideo(i: number) {
    this.showRecentVideo = true;
    this.recentVideoUrl = this.streams[i].twitchUrl;

    document.body.style.overflow = 'hidden';
  }

  closeRecentVideo() {
    this.showRecentVideo = false;
    document.body.style.overflow = 'visible';
  }

  onRegister() {
    this.iframeService.register();
  }

  onLogin() {
    this.iframeService.login();
  }

  getCurrentLang() {
    return this.translateService.currentLang === 'en'
      ? 'en'
      : this.translateService.currentLang === 'ru'
      ? 'ru'
      : 'ge';
  }

  getfinalData() {
    return this.campaignService
      .getFinalData('live-tv-drawing-080722/user?scope=final&date=2022-07-22')
      .subscribe((res: any) => {
        res;
        this.finalData.total = res.data.metadata.tickets.total;
        this.finalData.bet = res.data.metadata.tickets.bet;
        this.finalData.deposit = res.data.metadata.tickets.deposit;
        this.finalData.betProgress = res.data.metadata.progress.bet;
        this.finalData.depositProgress = res.data.metadata.progress.deposit;
        this.calculateProgressWidth(
          this.finalData.depositProgress,
          this.finalData.betProgress
        );
      });
  }

  calculateProgressWidth(depositProgress: number, betProgress: number) {
    this.progress.depositProgress = (100 / 1000) * depositProgress;
    this.progress.betProgress = (100 / 5000) * betProgress;
  }

  setTimer() {
    const today = new Date();

    const schedule = [
      '2022-07-10T21:55:00',
      '2022-07-11T21:55:00',
      '2022-07-12T21:55:00',
      '2022-07-13T21:55:00',
      '2022-07-14T21:55:00',
      '2022-07-15T21:55:00',
      '2022-07-16T21:55:00',
      '2022-07-17T21:55:00',
      '2022-07-18T21:55:00',
      '2022-07-19T21:55:00',
      '2022-07-20T21:55:00',
      '2022-07-21T21:55:00',
      '2022-07-22T21:55:00',
      '2022-07-24T21:55:00',
    ];

    for (const i in schedule) {
      const date = new Date(schedule[i]);

      if (today < date) {
        countdown$(date).subscribe((x) => {
          if (
            (x.hours === 0 && x.minutes === 0 && x.seconds === 0) ||
            (x.hours === 23 && x.minutes > 30)
          ) {
            this.checkLive();
            this.getActiveQuestion();
            this.callFunction = false;
            return;
          }

          this.timer = {
            hours: x.hours.toString().padStart(2, '0'),
            minutes: x.minutes.toString().padStart(2, '0'),
            seconds: x.seconds.toString().padStart(2, '0'),
          };
        });

        break;
      }
    }
  }

  checkUser() {
    interval(250)
      .pipe(
        switchMap(() => {
          return of(this.authService.isAuthorized());
        })
      )
      .subscribe((res) => {
        if (res) {
          if (this.isAuthorized !== res) {
            this.isAuthorized = res;
          }
        } else {
          this.isAuthorized = false;
        }
      });
  }

  //gasuli gatamasebebis linkebi
  getUrl() {
    this.campaignService.getLiveStreams().subscribe((res: any) => {
      res.data.forEach((item: any) => {
        if (item.schedule.length === 0) {
          item.schedule = 'საზაფხულო გათამაშება';
          return;
        } else {
          const d = new Date(item.schedule);
          item.schedule = `${d.getDate() < 10 ? 0 : ''}${d.getDate()}.0${
            d.getUTCMonth() + 1
          }.${d.getUTCFullYear()}`;
        }
      });

      this.streams = res.data;
    });
  }

  checkLive() {
    if (this.callFunction) {
      timer(0, 10000)
        .pipe(switchMap(() => this.campaignService.getSchedule('live')))
        .subscribe((res) => {
          if (res.data === null) {
            this.isLive = false;
            return;
          }
          this.liveUrl = res.data.twitchUrl;
          this.isLive = true;
        });
    } else {
      return;
    }
  }

  getActiveQuestion() {
    if (this.callFunction) {
      timer(0, 2000)
        .pipe(
          switchMap(() => {
            let res = null;
            if (!this.questionId) {
              res = this.campaignService.getActive('live-tv-drawing-080722');
            } else {
              res = of(this.questionId);
            }
            return res;
          })
        )
        .subscribe((questionId: number) => {
          this.questionId = questionId;
          if (!!questionId) {
            this.disableBtn = false;
          } else {
            this.disableBtn = true;
          }
        });
    } else {
      return;
    }
  }

  submitAnswer() {
    this.campaignService
      .submitAnswer(
        'live-tv-drawing-080722',
        this.questionId.toString(),
        this.answer
      )
      .subscribe({
        next: (res: any) => {
          if (res.data) {
            if (res.data.correct) {
              if (res.data.prize) {
                //this.prizeAmount = res.data.prize.amount;
                this.showPrize = true;
              } else {
                // this.showLate = true;
              }
            } else {
              //this.showError = true;
            }
          }
        },
        error: (e) => {
          if (e.message.toString() === 'Not Authorized') {
            //this.showAuth = true;
          }
          if (
            e.error &&
            e.error.message.toString() === 'ANSWER_ALREADY_SUBMITTED'
          ) {
            //this.showSubmited = true;
          }
        },
      });
  }

  getRules() {
    this.translateService.onLangChange
      .pipe(
        switchMap((language: any) => {
          const lang = language.lang === 'ge' ? 'ka' : language.lang;
          return this.campaignService.getRules(lang);
        })
      )
      .subscribe((res: any) => {
        this.rules = res.data;
        this.additionalRules = this.rules.splice(this.rules.length - 1, 1)[0];
      });
  }

  onClosePrize() {
    this.showPrize = false;
  }
}
