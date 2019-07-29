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

import { NativeGeocoder,NativeGeocoderOptions} from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { FileTransfer} from '@ionic-native/file-transfer/ngx';
import { ParticlesModule } from 'angular-particle';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("783579639968-n4onq72d8o3rlv35q4i8dg25igf0e9jc.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("479469605950241")
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
    ParticlesModule,
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
    NativeGeocoder,
    ImagePicker,
    Geolocation,
    Crop,
    FileTransfer,
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
