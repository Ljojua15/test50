import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { LandingComponent } from './landing/landing.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AccordionComponent } from './accordion/accordion.component';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AppRoutingModule } from './app-routing.module';
import { EverydayTicketsComponent } from './landing/everyday-tickets/everyday-tickets.component';
import { FinalTicketsComponent } from './landing/final-tickets/final-tickets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SafeUrlPipe } from './landing/safe-url.pipe';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AccordionComponent,
    AccordionItemComponent,
    EverydayTicketsComponent,
    FinalTicketsComponent,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'ge',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
