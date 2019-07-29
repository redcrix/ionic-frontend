import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController, } from '@ionic/angular';

import { Router } from '@angular/router';


import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../api.service';

import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  submitted = false;
  loginForm: FormGroup;
  SignupForm : FormGroup;
  private user: SocialUser;
  private loggedIn: boolean;
  signUp  = false;
  login = true;

  constructor(private fb: Facebook,public api: RestApiService,
    public loadingController: LoadingController, private formBuilder: FormBuilder,
    
  

    public toastController: ToastController,
    public alertController: AlertController, private router: Router, private authService: AuthService) { 

    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass : ['', [Validators.required, Validators.minLength(2)]],
    });

    this.SignupForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass : ['', [Validators.required, Validators.minLength(2)]],
      code : ['', [Validators.required, Validators.minLength(2)]],
     
    });

  }

  ngOnInit() {


      if (localStorage.getItem('LoggedInUser_data') != null) {
      this.router.navigate(['LandingPage']);  
    } if(localStorage.getItem('LoggedInUser_data') === null) {
      console.log('done');
    }



  }

  async presentLoading(loading) {
		return await loading.present();
	}


  async Login(){
    const loading = await this.loadingController.create();
    await loading.present();

    await this.api.LoginApi(this.loginForm.value)
    .subscribe(res => {
      console.log(res);
        console.log(res);
        this.submitted = true;

       
        let save_login_within_app = {
          name : JSON.stringify(res.name),
          id : JSON.stringify(res.id),
          auth_token : JSON.stringify(res.auth_token),
          type : JSON.stringify(res.type),
          email : this.loginForm.value.email
        }

        if (res.status === 0){
          loading.dismiss();
        }
  
        else if(res.status === 1){
          this.loggedIn = true;
          localStorage.removeItem('LoggedInUser_data');
          localStorage.setItem('LoggedInUser_data', JSON.stringify(save_login_within_app));
       
          loading.dismiss();
  
          this.router.navigate(['LandingPage']);
         
        }
      }, (err) => {
        console.log(err);
        loading.dismiss();
      });
  }

  // start(){
  //   this.router.navigate(['register']);
  // }


  async socialFb() {

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

   this.authService.authState.subscribe((user) => {

      console.log('debug 1 ==============' + JSON.stringify(user));
      this.user = user;

      localStorage.setItem('UserFb', JSON.stringify(this.user));
      

      this.loggedIn = (user != null);
      if (this.loggedIn == true)
        this.router.navigate(['LandingPage']);
      else
        this.router.navigate(['/']);
    });


  }
  async socialGoogle() {

    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  linkk() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then((res: FacebookLoginResponse) => console.log('DEBUG === 2 == response == ', JSON.stringify(res)))
    .catch(e => console.log('DEBUG === 3 == error == ', JSON.stringify(e)));

    this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

  }
  signupInput(){
    this.login = false;
    this.signUp  = true;
   
  }

  verify(){
    console.log(this.SignupForm.value.email);
  }

  LoginBac(){
    this.signUp  = false;
    this.login = true;
   
  }
 


}
