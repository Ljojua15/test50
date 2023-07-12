import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IframeService {
  sendMessage(code: number, payload?: string) {
    const CROSS_ORIGIN = '*';

    if (code === 1002) {
      window.parent.postMessage(
        {
          action: 'register',
          code: 1002,
          message: 'Login command',
        },
        CROSS_ORIGIN
      );
    } else if (code === 1001) {
      window.parent.postMessage(
        {
          action: 'login',
          code: 1001,
          message: 'Login command',
        },
        CROSS_ORIGIN
      );
    } else if (code === 1012) {
      window.parent.postMessage(
        {
          action: 'deposit',
          code: 1012,
          message: 'deposit command',
        },
        CROSS_ORIGIN
      );
    } else if (code === 1004) {
      window.parent.postMessage(
        {
          action: 'verification',
          code: 1004,
          message: 'Verification command',
        },
        CROSS_ORIGIN
      );
    } else if (code === 1003) {
      window.parent.postMessage(
        {
          action: 'height',
          code: 1003,
          value: document.body.offsetHeight,
          message: 'Height',
        },
        CROSS_ORIGIN
      );
    } else if (code === 1010) {
      window.parent.postMessage(
        {
          action: 'link',
          code: 1010,
          value: payload,
          message: 'redirect',
        },
        CROSS_ORIGIN
      );
    } else if (code === 1011) {
      window.parent.postMessage(
        {
          action: 'openTab',
          code: 1011,
          value: payload,
          message: 'openTab',
        },
        CROSS_ORIGIN
      );
    }
  }

  register() {
    this.sendMessage(1002);
  }

  login() {
    this.sendMessage(1001);
  }

  deposit() {
    this.sendMessage(1012);
  }

  verification() {
    this.sendMessage(1004);
  }

  redirect(payload = 'https://crocobet.com/#/slots?menu=egt') {
    this.sendMessage(1010, payload);
  }

  openNewTab(payload = 'https://crocobet.com/#/slots') {
    this.sendMessage(1011, payload);
  }

  redirectToSlot(slot: string, provider: string) {
    this.sendMessage(
      1011,
      `https://crocobet.com/#/slots?menu=${provider}&provider=${provider}&slot=${slot}`
    );
  }
}
