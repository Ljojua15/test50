import {Component} from '@angular/core';
import {tabs} from "./config";

@Component({
  selector: 'crc-iframe-container',
  templateUrl: './iframe-container.component.html',
  styleUrls: ['./iframe-container.component.scss']
})
export class IframeContainerComponent {
  public curerrentTab: number = 2
  public tabs = tabs
}
