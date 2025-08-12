import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UpgradeModule
  ],
  providers: [],
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap(appRef: ApplicationRef) {
    // Bootstrap Angular root component
    appRef.bootstrap(AppComponent);
    // Bootstrap AngularJS application
    this.upgrade.bootstrap(document.body, ['appAjs']);
  }
}
