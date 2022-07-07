import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() tickets = new EventEmitter<number>();

  filePath = environment.filePath;

  dailyData: DailyData = {
    total: 0,
    bet: 0,
    deposit: 0,
    login: 0,
    verification: 0,
  };

  schedule = [
    '07.07',
    '08.07',
    '09.07',
    '10.07',
    '11.07',
    '12.07',
    '14.07',
    '15.07',
    '16.07',
    '17.07',
    '18.07',
    '19.07',
    '20.07',
    '21.07',
    '22.07',
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
  }

  getData() {
    const date = new Date();
    // const url = `live-tv-drawing-080722/user?scope=daily&date=${date.getUTCFullYear()}-0${
    //   date.getUTCMonth() + 1
    // }-${date.getUTCDate() > 10 ? 0 : date.getUTCDate()}${date.getUTCDate()}`;

    const [day, month] = this.currentDDMM.split('.');

    //tve > ricxvi

    const url = `live-tv-drawing-080722/user?scope=daily&date=${date.getUTCFullYear()}-${month}-${day}`;

    return this.campaignService.getUserData(url).subscribe((res: any) => {
      console.log(res);

      this.dailyData.login = res.data.metadata.tickets.login;
      this.dailyData.deposit = res.data.metadata.tickets.deposit;
      this.dailyData.bet = res.data.metadata.tickets.bet;
      this.dailyData.total = res.data.metadata.tickets.total;

      this.tickets.emit(res.data.metadata.tickets.total);
    });
  }

  getDate(date: string) {
    this.currentDDMM = date;
    this.getData();
  }

  openModal() {
    // this.openInfo = true;
    this.openInfo = true;
  }

  closeModal() {
    this.openInfo = false;
  }
}
