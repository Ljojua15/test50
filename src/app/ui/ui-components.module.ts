import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingContainerComponent } from './landing-container/landing-container.component';
import { LandingContainerHeaderComponent } from './landing-container/landing-container-header/landing-container-header.component';
import { LandingContainerBodyComponent } from './landing-container/landing-container-body/landing-container-body.component';
import { LandingContainerFooterComponent } from './landing-container/landing-container-footer/landing-container-footer.component';
import { AuthorizationBlockComponent } from './authorization-block/authorization-block.component';
import { TranslateModule } from '@ngx-translate/core';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { PlayButtonComponent } from './landing-container/landing-container-body/play-button/play-button.component';
import { WheelComponent } from './landing-container/landing-container-body/wheel/wheel.component';
import { ProgressBarComponent } from './landing-container/landing-container-body/progress-bar/progress-bar.component';
import { GelPipePipe } from '../shared/pipes/gel-pipe.pipe';
import { SlotsComponent } from './landing-container/landing-container-body/slots/slots.component';
import { PopupContainerComponent } from './landing-container/landing-container-body/popup-container/popup-container.component';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';
import { PromosComponent } from './landing-container/landing-container-body/promos/promos.component';
import { IframeContainerComponent } from './landing-container/landing-container-body/iframe-container/iframe-container.component';
import { LeaderBoardComponent } from './landing-container/landing-container-body/leader-board/leader-board.component';

@NgModule({
  declarations: [
    LandingContainerComponent,
    LandingContainerHeaderComponent,
    LandingContainerBodyComponent,
    LandingContainerFooterComponent,
    AuthorizationBlockComponent,
    AccordionComponent,
    AccordionItemComponent,
    PlayButtonComponent,
    WheelComponent,
    ProgressBarComponent,
    GelPipePipe,
    SafeUrlPipe,
    SlotsComponent,
    PopupContainerComponent,
    PromosComponent,
    IframeContainerComponent,
    LeaderBoardComponent,
  ],
  exports: [
    LandingContainerComponent,
    LandingContainerHeaderComponent,
    LandingContainerBodyComponent,
    LandingContainerFooterComponent,
    AuthorizationBlockComponent,
  ],
  imports: [CommonModule, TranslateModule],
})
export class UiComponentsModule {}
