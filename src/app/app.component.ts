import { Component, OnInit } from '@angular/core';
import { IframeService } from './services/iframe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  overflow: string = 'hidden';

  constructor(private iframeService: IframeService) {}

  ngOnInit() {
    let currentHeight = 0;

    document.body.style.minHeight = 'unset';

    setInterval(() => {
      if (document.body.offsetHeight !== currentHeight) {
        currentHeight = document.body.offsetHeight;
        this.iframeService.sendMessage(1003);
      }
    }, 250);
  }
}
