import {Component, OnInit} from '@angular/core';
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  overflow: string = 'hidden';


  ngOnInit() {
    environment.production ? this.overflow = 'hidden' : this.overflow = 'visible';
    document.body.style.overflow = this.overflow;
    let currentHeight = 0;

    document.body.style.minHeight = "unset";

    setInterval(() => {
      if (document.body.offsetHeight !== currentHeight) {
        currentHeight = document.body.offsetHeight;
      }
    }, 250)

  }
}
