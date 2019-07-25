import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../api.service';
import { Router } from '@angular/router';
import { ToastController, AlertController, } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  FB_APP_ID: number = 330683611150903;
  submitted = false;
  loginForm: FormGroup;
  loggedIn = false;

  constructor(private fb: Facebook,public api: RestApiService,
    public loadingController: LoadingController, private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController,) { 

    this.loginForm = this.formBuilder.group({
      email : ['', [Validators.required, Validators.email]],
      pass : ['', [Validators.required, Validators.minLength(2)]],
    });

  }

  ngOnInit() {


      if (localStorage.getItem('LoggedInUser_data') != null) {
      this.router.navigate(['MyTab']);  
    } if(localStorage.getItem('LoggedInUser_data') === null) {
      console.log('done');
    }

  }

  async doFbLogin(){
		const loading = await this.loadingController.create({
			message: 'Please wait...'
		});
		this.presentLoading(loading);
		// let permissions = new Array<string>();

		//the permissions your facebook app needs from the user
    const permissions = ["public_profile", "email"];

		this.fb.login(permissions)
		.then(response =>{
			let userId = response.authResponse.userID;

			//Getting name and gender properties
			this.fb.api("/me?fields=name,email", permissions)
			.then(user =>{
				user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
				//now we have the users info, let's save it in the NativeStorage
				// this.nativeStorage.setItem('facebook_user',
				// {
				// 	name: user.name,
				// 	email: user.email,
				// 	picture: user.picture
				// })
				// .then(() =>{
				// 	this.router.navigate(["/user"]);
				// 	loading.dismiss();
				// }, error =>{
				// 	console.log(error);
				// 	loading.dismiss();
        // })
        
        console.log('USER DETAILS == '+user);
			})
		}, error =>{
			console.log(error);
			loading.dismiss();
		});
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
  
          this.router.navigate(['home']);
         
        }
      }, (err) => {
        console.log(err);
        loading.dismiss();
      });
  }

  start(){
    this.router.navigate(['register']);
  }


}
