import { Component, OnInit } from '@angular/core';
import { IframeService } from 'src/app/services/iframe.service';

@Component({
  selector: 'crc-authorization-block',
  templateUrl: './authorization-block.component.html',
  styleUrls: ['./authorization-block.component.scss'],
})
export class AuthorizationBlockComponent implements OnInit {
  constructor(private iframeService: IframeService) {}

  ngOnInit(): void {}

  onRegister() {
    this.iframeService.register();
  }

  onLogin() {
    this.iframeService.login();
  }
}
