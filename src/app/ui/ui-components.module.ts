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
import { PlayBtnComponent } from './landing-container/landing-container-body/play-btn/play-btn.component';
import { WheelContainerComponent } from './landing-container/landing-container-body/wheel-container/wheel-container.component';

@NgModule({
  declarations: [
    LandingContainerComponent,
    LandingContainerHeaderComponent,
    LandingContainerBodyComponent,
    LandingContainerFooterComponent,
    AuthorizationBlockComponent,
    AccordionComponent,
    AccordionItemComponent,
    PlayBtnComponent,
    WheelContainerComponent,
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
