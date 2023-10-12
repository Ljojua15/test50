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
import { CompTreeComponent } from './landing-container/landing-container-body/comp-tree/comp-tree.component';
import { CompFourComponent } from './landing-container/landing-container-body/comp-four/comp-four.component';
import { BackgroundComponent } from './landing-container/landing-container-body/background/background.component';
import { InfoPopupComponent } from './landing-container/landing-container-body/info-popup/info-popup.component';
import { WheelInfoComponent } from './landing-container/landing-container-body/wheel-info/wheel-info.component';
import { HistoryPopupComponent } from './landing-container/landing-container-body/history-popup/history-popup.component';
import { WinPopupComponent } from './landing-container/landing-container-body/win-popup/win-popup.component';

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
    CompTreeComponent,
    CompFourComponent,
    BackgroundComponent,
    InfoPopupComponent,
    WheelInfoComponent,
    HistoryPopupComponent,
    WinPopupComponent,
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
