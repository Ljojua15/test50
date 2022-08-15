import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import { LandingComponent } from './landing/landing.component';
import {AuthInterceptor} from "./core/interceptors/auth.interceptor";
import { AccordionComponent } from './ui/accordion/accordion.component';
import { AccordionItemComponent } from './ui/accordion-item/accordion-item.component';
import {UiComponentsModule} from "./ui/ui-components.module";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AccordionComponent,
    AccordionItemComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiComponentsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      },
      defaultLanguage: 'ge',
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
