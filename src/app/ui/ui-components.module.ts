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
import { SwiperModule } from 'swiper/angular';
import { PromotionsSwiperComponent } from './landing-container/landing-container-body/promotions-swiper/promotions.component';
import { PopupContainerComponent } from './landing-container/landing-container-body/popup-container/popup-container.component';
import { LiveComponent } from './landing-container/landing-container-body/live/live.component';
import { SafeUrlPipe } from '../shared/pipes/safe-url.pipe';
import { WithdrawPopupComponent } from './landing-container/landing-container-body/withdraw-popup/withdraw-popup.component';
import { UfoAndCasinoComponent } from './landing-container/landing-container-body/withdraw-popup/ufo-and-casino/ufo-and-casino.component';
import { ChooseSlotComponent } from './landing-container/landing-container-body/withdraw-popup/choose-slot/choose-slot.component';
import { CongratPopupComponent } from './landing-container/landing-container-body/congrat-popup/congrat-popup.component';

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
    PromotionsSwiperComponent,
    PopupContainerComponent,
    LiveComponent,
    WithdrawPopupComponent,
    UfoAndCasinoComponent,
    ChooseSlotComponent,
    CongratPopupComponent,
  ],
  exports: [
    LandingContainerComponent,
    LandingContainerHeaderComponent,
    LandingContainerBodyComponent,
    LandingContainerFooterComponent,
    AuthorizationBlockComponent,
  ],
  imports: [CommonModule, TranslateModule, SwiperModule],
})
export class UiComponentsModule {}
