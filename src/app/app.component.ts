import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import { IframeService } from './services/iframe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  overflow: string = 'hidden';

  constructor(private iFrameService: IframeService) {}

  ngOnInit() {
    environment.production
      ? (this.overflow = 'hidden')
      : (this.overflow = 'visible');
    document.body.style.overflow = this.overflow;
    let currentHeight = 0;

    document.body.style.minHeight = 'unset';

    setInterval(() => {
      if (document.body.offsetHeight !== currentHeight) {
        currentHeight = document.body.offsetHeight;
        this.iFrameService.sendMessage(1003);
      }
    }, 250);
  }
}
