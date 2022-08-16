import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { TranslateResolver } from './translate.resolver';

const routes: Routes = [
  { path: '', component: LandingComponent },
  {
    path: ':lang',
    resolve: { translate: TranslateResolver },
    component: LandingComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
