import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastController, AlertController, } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../api.service';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';



@Component({
  selector: 'app-walk-through',
  templateUrl: './walk-through.page.html',
  styleUrls: ['./walk-through.page.scss'],
})
export class WalkThroughPage implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;


  constructor(private fb: Facebook, public api: RestApiService,
    public loadingController: LoadingController,

    public toastController: ToastController,
    public alertController: AlertController, private router: Router, private authService: AuthService) {

    if (localStorage.getItem('LoggedInUser_data') != null) {
      this.router.navigate(['MyTab']);
    } if (localStorage.getItem('LoggedInUser_data') === null) {
      console.log('done');
    }

    // this.authService.authState.subscribe((user) => {

    //   this.user = user;
    //   localStorage.setItem('UserFb', JSON.stringify(this.user));
    //   // console.log(JSON.parse(localStorage.getItem('UserFb'));

    //   this.loggedIn = (user != null);
    // });



    this.countdown();

  }

  countdown() {
    let countDownDate = new Date("Jul 31, 2019 14:50:25").getTime();

    // Update the count down every 1 second
    let x = setInterval(function () {

      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // Time calculations for days, hours, minutes and seconds
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      // console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);

      // Output the result in an element with id="demo"
      document.getElementById("demo").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

      // If the count down is over, write some text 
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);

  }

  ngOnInit() {
    // this.authService.authState.subscribe((user) => {

    //   console.log('debug 1 ==============' + JSON.stringify(user));
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   if (this.loggedIn == true)
    //     this.router.navigate(['register']);
    //   else
    //     this.router.navigate(['/']);
    // });
  }

  continue_() {
  
    this.router.navigate(['login']);
  }

  // start() {
  //   this.router.navigate(['register']);
  // }

  // login() {
  //   this.router.navigate(['login']);
  // }

  // async socialFb() {

  //   this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }
  // async socialGoogle() {

  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  // }

  // linkk() {
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //   .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', JSON.stringify(res)))
  //   .catch(e => console.log('Error logging into Facebook', e));

  //   this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

  // }

}
