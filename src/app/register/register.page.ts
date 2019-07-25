import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastController, AlertController, } from '@ionic/angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../api.service';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;

  Addresso;

  @ViewChild('myInput') myInput: ElementRef;
  submitted = false;
  registerForm: FormGroup;
  showErro = false;
  //loggedIn = false;
  unMatchedCredentials = false;
  login_info_store;
  secondFormGroup : FormGroup;
  kyc_form_show = true;
  confirm_box = false;

  constructor(public api: RestApiService,
    public loadingController: LoadingController, private formBuilder: FormBuilder,
    private router: Router,
    public toastController: ToastController,
    public alertController: AlertController ,private authService: AuthService) {

      if (localStorage.getItem('LoggedInUser_data') != null) {
        this.router.navigate(['MyTab']);  
      } if(localStorage.getItem('LoggedInUser_data') === null) {
        console.log('done');
      }
      this.authService.authState.subscribe((user) => {

        this.user = user;
        this.loggedIn = (user != null);
    });

      this.registerForm = this.formBuilder.group({
      'userid':[this.user.id],
      'accesToken':[this.user.authToken],
      'provider':[this.user.provider],
        'firstname' : [ this.user.firstName,Validators.required],
        'middlename' : [null, Validators],
        'lastname' : [ this.user.lastName,Validators.required],
        'dob' : [ Validators.required],
      //  'address' : [this.Addresso, Validators.required],
        'nationality' : [null, Validators.required],
        
        //'email' : [null, Validators.required],
        //'password' : [null, [Validators.required, Validators.minLength(2)]],
        // 'type' : [null ],
  
     
      });

      this.secondFormGroup= this.formBuilder.group({
    
        'idtype' : [null, Validators.required],
  
  
     
      });
     }

    //  front-back ID no with Issue, Expiry With OCR


    ngOnInit() {
      this.authService.authState.subscribe((user) => {

          this.user = user;
          this.loggedIn = (user != null);
      });
  
    }


  async RegisterFun(){

    console.log(this.registerForm.value);

    this.unMatchedCredentials = false;
    this.submitted = true;
    this.showErro = false;

    

    const loading = await this.loadingController.create();
    console.log(this.registerForm.value.userid);
    await loading.present();
    let data = {
      userid:this.registerForm.value.userid,
      accesToken:this.registerForm.value.accesToken,
      provider:this.registerForm.value.provider,
      firstname : this.registerForm.value.firstname, 
      middlename : this.registerForm.value.middlename,
      lastname : this.registerForm.value.lastname,
      dob : this.registerForm.value.dob,
      address : this.Addresso,
      nationality : this.registerForm.value.nationality
    };

    console.log(data);
    await this.api.RegisterApi(data)
    .subscribe(res => {
      console.log('api+respo'+JSON.stringify(res));
      loading.dismiss();
      if (res.status === 0){
        loading.dismiss();
        this.unMatchedCredentials = true;
      }

      else if(res.status === 1){
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
      //     message: 'Successfully registered',
      //     duration: 2000,
      //     position: 'top'
      //   });
      //   await toast.present();
      // }
      // else{
      //   const toast = await this.toastController.create({
      //     message: 'WRONG CREDENTIALS - SIGNUP NOW.',
      //     duration: 2000,
      //     position: 'top'
      //   });
      //   await toast.present();
      // }

      
  }


  // async Login(){
  //   const loading = await this.loadingController.create();
  //   await loading.present();

  //  let data = {
  //     email : this.registerForm.value.email,
  //     password : this.registerForm.value.password,
  //   }

  //   console.log(data);

  //   await this.api.LoginApi(data)
  //   .subscribe(res => {
  //     console.log(res);
  //       console.log(res);
  //       this.submitted = true;

  //       this.login_info_store = {
  //         name : JSON.stringify(res.name),
  //         id : JSON.stringify(res.id),
  //         auth_token : JSON.stringify(res.auth_token),
  //         type : JSON.stringify(res.type),
  //         email : this.registerForm.value.email
  //       }


  //       localStorage.removeItem('LoggedInUser_data');
       
  //       console.log('before'+this.login_info_store);
    
  //        localStorage.setItem('LoggedInUser_data', JSON.stringify(this.login_info_store));
 
  //       loading.dismiss();

         
  //       this.router.navigate(['MyTab']);
    
  
  //     }, (err) => {
  //       console.log(err);
  //       loading.dismiss();
  //     });
  // }

  Back(){
    this.router.navigate(['LandingPage']);
  }

  async dont(){

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







}
