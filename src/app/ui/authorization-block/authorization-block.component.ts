import { Component } from '@angular/core';
import { IframeService } from 'src/app/services/iframe.service';

@Component({
  selector: 'crc-authorization-block',
  templateUrl: './authorization-block.component.html',
  styleUrls: ['./authorization-block.component.scss'],
})
export class AuthorizationBlockComponent {
  hasAnimation = true;

  constructor(private iframeService: IframeService) {}

  onRegister() {
    this.iframeService.register();
  }

  onLogin() {
    this.iframeService.login();
  }
}
