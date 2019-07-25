import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpModule } from '@angular/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP_INTERCEPTORS, HttpClientModule, } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { 
  PathLocationStrategy } from '@angular/common';

  import { Facebook } from '@ionic-native/facebook/ngx';
  import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
  import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
  import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("68331676966-rtfsc4e4v2llr1pgee0i0o69la1llg6j.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("364152994258660")
  }
]);

export function provideConfig() {
  return config;
}
  // import {MatStepperModule} from '@angular/material/stepper';
  // import {MatInputModule} from '@angular/material/input';
  // import {MatButtonModule,MatMenuModule, MatCheckboxModule} from '@angular/material';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    // MatStepperModule,
    BrowserModule, 
    SocialLoginModule,
    // MatInputModule,
    // MatButtonModule,MatMenuModule, MatCheckboxModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule],
  providers: [
    InAppBrowser,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    {provide: LocationStrategy, useClass: PathLocationStrategy},
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
