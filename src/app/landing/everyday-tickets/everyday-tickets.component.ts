import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CampaignService } from 'src/app/services/campaign.service';
import { environment } from 'src/environments/environment';
import { DailyData } from '../user';

@Component({
  selector: 'app-everyday-tickets',
  templateUrl: './everyday-tickets.component.html',
  styleUrls: ['./everyday-tickets.component.scss'],
})
export class EverydayTicketsComponent implements OnInit {
  // @Input() userData!: DailyData;
  @Output() playVideo = new EventEmitter();

  @Output() tickets = new EventEmitter<number>();
  @Input() lang: string | undefined;

  nextLive = '';
  lastLive = '';
  showLive = false;

  filePath = environment.filePath;

  dailyData: DailyData = {
    total: 0,
    bet: 0,
    deposit: 0,
    login: 0,
    verification: 0,
  };

  schedule = [
    { date: '08.07', wasLive: false },
    { date: '09.07', wasLive: false },
    { date: '10.07', wasLive: false },
    { date: '11.07', wasLive: false },
    { date: '12.07', wasLive: false },
    { date: '13.07', wasLive: false },
    { date: '14.07', wasLive: false },
    { date: '15.07', wasLive: false },
    { date: '16.07', wasLive: false },
    { date: '17.07', wasLive: false },
    { date: '18.07', wasLive: false },
    { date: '19.07', wasLive: false },
    { date: '20.07', wasLive: false },
    { date: '21.07', wasLive: false },
    { date: '22.07', wasLive: false },
  ];

  openInfo = false;
  currentDDMM: string = '';

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    const date = new Date();
    this.currentDDMM = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${
      date.getUTCMonth() + 1 < 10 ? 0 : date.getUTCMonth()
    }${date.getUTCMonth() + 1}`;
    this.getData();

    this.nextLive = `${date.getDate() + 2}.${
      date.getUTCMonth() + 1 < 10 ? 0 : date.getUTCMonth()
    }${date.getUTCMonth() + 1}`;

    this.checkRecent();
  }

  getData() {
    const date = new Date();
    const [day, month] = this.currentDDMM.split('.');
    const url = `live-tv-drawing-080722/user?scope=daily&date=${date.getUTCFullYear()}-${month}-${day}`;

    return this.campaignService.getUserData(url).subscribe((res: any) => {
      this.dailyData.login = res.data.metadata.tickets.login;
      this.dailyData.deposit = res.data.metadata.tickets.deposit;
      this.dailyData.bet = res.data.metadata.tickets.bet;
      this.dailyData.total = res.data.metadata.tickets.total;

      this.tickets.emit(res.data.metadata.tickets.total);
    });
  }

  getDate(date: any) {
    this.currentDDMM = date.date;

    this.showLive = date.wasLive;
    let [day, month] = date.date.split('.');

    this.nextLive = `${Math.min(+day + 2, 24)}.${month}`;

    this.getData();
  }

  checkRecent() {
    const currentDate = new Date();
    const liveEnd = currentDate.getHours();
    const today = currentDate.getDate();

    this.schedule.forEach((date) => {
      const [day] = date.date.split('.');

      const [currentDay] = this.currentDDMM.split('.');

      if (+currentDay > +day || (liveEnd > 23 && today === +day)) {
        date.wasLive = true;
      }
    });
  }

  openModal() {
    this.openInfo = true;
  }

  closeModal() {
    this.openInfo = false;
  }

  openVideo() {
    this.playVideo.emit(this.nextLive);
  }
}
