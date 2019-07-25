import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastController, AlertController, } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../api.service';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
declare var google;

// import { google } from 'google-maps';

// declare var google;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;


  userLocation;
  userCity;
  lat;
  lng;
  location;
  latLngResult;
  userLocationFromLatLng;


  Addresso;
 
  address: string;

  @ViewChild('myInput') myInput: ElementRef;
  submitted = false;
  registerForm: FormGroup;
  showErro = false;
  //loggedIn = false;
  unMatchedCredentials = false;
  login_info_store;
  secondFormGroup: FormGroup;
  kyc_form_show = true;
  confirm_box = false;

  constructor(public zone: NgZone, 
   private platform: Platform,
    
    private geolocation: Geolocation,
    public api: RestApiService,
    private nativeGeocoder: NativeGeocoder,
    public loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,
    private authService: AuthService) {


      this.initializeApp();


    if (localStorage.getItem('LoggedInUser_data') != null) {
      this.router.navigate(['MyTab']);
    } if (localStorage.getItem('LoggedInUser_data') === null) {
      console.log('done');
    }
    this.authService.authState.subscribe((user) => {

      this.user = user;
      this.loggedIn = (user != null);
    });

    this.registerForm = this.formBuilder.group({
      'userid': [this.user.id],
      'accesToken': [this.user.authToken],
      'provider': [this.user.provider],
      'firstname': [this.user.firstName, Validators.required],
      'middlename': [null, Validators],
      'lastname': [this.user.lastName, Validators.required],
      'dob': [Validators.required],
      //  'address' : [this.Addresso, Validators.required],
      'nationality': [null, Validators.required],

      //'email' : [null, Validators.required],
      //'password' : [null, [Validators.required, Validators.minLength(2)]],
      // 'type' : [null ],


    });

    this.secondFormGroup = this.formBuilder.group({

      'idtype': [null, Validators.required],
    });
  }

  //  front-back ID no with Issue, Expiry With OCR


  initializeApp() {
    this.platform.ready().then(() => {
      this.geoCoder();
    });
  }


  ngOnInit() {
    this.authService.authState.subscribe((user) => {

      this.user = user;
      this.loggedIn = (user != null);
    });

  }


  async RegisterFun() {

    console.log(this.registerForm.value);

    this.unMatchedCredentials = false;
    this.submitted = true;
    this.showErro = false;



    const loading = await this.loadingController.create();
    console.log(this.registerForm.value.userid);
    await loading.present();
    let data = {
      userid: this.registerForm.value.userid,
      accesToken: this.registerForm.value.accesToken,
      provider: this.registerForm.value.provider,
      firstname: this.registerForm.value.firstname,
      middlename: this.registerForm.value.middlename,
      lastname: this.registerForm.value.lastname,
      dob: this.registerForm.value.dob,
      address: this.Addresso,
      nationality: this.registerForm.value.nationality
    };

    console.log(data);
    await this.api.RegisterApi(data)
      .subscribe(res => {
        console.log('api+respo' + JSON.stringify(res));
        loading.dismiss();
        if (res.status === 0) {
          loading.dismiss();
          this.unMatchedCredentials = true;
        }

        else if (res.status === 1) {
          this.loggedIn = true;
          loading.dismiss();

          this.kyc_form_show = false;
          this.confirm_box = true;

          // localStorage.removeItem('LoggedInUser_KYC');

          // console.log('before == SAVING registerForm.value'+this.registerForm.value);

          // localStorage.setItem('LoggedInUser_KYC', this.registerForm.value);


          // this.Login(); ==again Token Access Verify (GOOGLE AUTH)
        }

      }, (err) => {


        console.log(err);
        loading.dismiss();


      });

    // if(this.loggedIn = true){
    //   const toast = await this.toastController.create({
    //     message: 'Successfull',
    //     duration: 2000,
    //     position: 'top'
    //   });
    //   await toast.present();
    // }
    // else{
    //   const toast = await this.toastController.create({
    //     message: 'WRONG CREDENTIALS.',
    //     duration: 2000,
    //     position: 'top'
    //   });
    //   await toast.present();
    // }


  }


  Back() {
    this.router.navigate(['LandingPage']);
  }

  async dont() {

    const alert = await this.alertController.create({
      header: 'Dismiss Form',
      subHeader: 'Contact Us if you have further queries.',
      message: 'You are now redirecting to your dashboard',
      buttons: ['OK']
    });

    await alert.present();


    this.router.navigate(['LandingPage']);


  }

  resize() {
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
  }


  geoCoder() {

    this.geolocation.getCurrentPosition().then((resp) => {

    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      console.log(data.coords.latitude);
      console.log(data.coords.longitude);
    });


    // Option 1

       let geocoder = new google.maps.Geocoder;
    let latlng = {lat: parseFloat(this.lat), lng: parseFloat(this.lng)};
    geocoder.geocode({'location': latlng}, (results, status) => {
       console.log(results); // read data from here
       console.log(status);
    });

    // Option 2

    // let options: NativeGeocoderOptions = {
    //   useLocale: true,
    //   maxResults: 5
    // };

    // this.nativeGeocoder.reverseGeocode(this.lat, this.lng, options)
    //   .then((result: NativeGeocoderResult[]) => console.log(JSON.stringify(result[0])))
    //   .catch((error: any) => console.log(error));

    // this.nativeGeocoder.forwardGeocode('Berlin', options)
    //   .then((result: NativeGeocoderResult[]) => console.log('The coordinates are latitude=' + result[0].latitude + ' and longitude=' + result[0].longitude))
    //   .catch((error: any) => console.log(error));


  }


  getUserLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // this.getGeoLocation(resp.coords.latitude, resp.coords.longitude)
      if (this.platform.is('cordova')) {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
          .then((result: any) => {
            console.log(result)
            this.userLocation = result[0]
            console.log(this.userLocation)
          })
          .catch((error: any) => console.log(error));
      } else {
        this.getGeoLocation(resp.coords.latitude, resp.coords.longitude)
      }
    }).catch((error) => {
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      if (this.platform.is('cordova')) {
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude, options)
          .then((result: NativeGeocoderResult[]) => {
            console.log(result)
            this.userLocation = result[0]
            console.log(this.userLocation)
          })
          .catch((error: any) => console.log(error));
      } else {
        console.log('not cordove')
        this.getGeoLocation(data.coords.latitude, data.coords.longitude)
      }
    });
  }
  async getGeoLocation(lat: number, lng: number, type?) {
    if (navigator.geolocation) {
      let geocoder = await new google.maps.Geocoder();
      let latlng = await new google.maps.LatLng(lat, lng);
      let request = { latLng: latlng };

      await geocoder.geocode(request, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          let result = results[0];
          this.zone.run(() => {
            if (result != null) {
              this.userCity = result.formatted_address;
              if (type === 'reverseGeocode') {
                this.latLngResult = result.formatted_address;
              }
            }
          })
        }
      });
    }
  }
  reverseGeocode(lat, lng) {
    if (this.platform.is('cordova')) {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.reverseGeocode(lat, lng, options)
        .then((result: NativeGeocoderResult[]) => this.userLocationFromLatLng = result[0])
        .catch((error: any) => console.log(error));
    } else {
      this.getGeoLocation(lat, lng, 'reverseGeocode');
    }
  }
  forwardGeocode(address) {
    if (this.platform.is('cordova')) {
      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(address, options)
        .then((result: NativeGeocoderResult[]) => {
          this.zone.run(() => {
            this.lat = result[0].latitude;
            this.lng = result[0].longitude;
          })
        })
        .catch((error: any) => console.log(error));
    } else {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.zone.run(() => {
            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();
          })
        } else {
          alert('Error - ' + results + ' & Status - ' + status)
        }
      });
    }
  }





}
