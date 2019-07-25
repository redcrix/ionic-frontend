import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor( private router: Router,private iab: InAppBrowser) {
    this.countdown();
  }

  logout(){
    localStorage.removeItem('LoggedInUser_data');
    this.router.navigate(['walk-through']);
  }

  // YouTube – 
  // Google My Business – 
  // Crunchbase – 
  
  // Bitcoin Talk – 

  
  TermsofUse(){
    this.router.navigate(['terms']);
  } 
  PrivacyPolicy(){
    this.router.navigate(['privacy-policy']);
  } 
  DataProtectionPolicy(){
    this.router.navigate(['data-protection']);
  } 
  
   

  Calendly(){
    this.iab.create('https://calendly.com/leruths');   
  }


  Zoom(){
    this.iab.create('https://zoom.us/j/9811913253');   
  }

  followFb(){
    this.iab.create('https://www.facebook.com/LeruthsTech');   
  }

  Website(){
    this.iab.create('https://www.leruths.io');   
  }

  Twitter(){
    this.iab.create('https://twitter.com/LeruthsTech');   
  }

  LinkedIn(){
    this.iab.create('https://www.linkedin.com/company/leruthstech');   
  }

  Instagram(){
    this.iab.create('https://www.instagram.com/LeruthsTech');   
  }

  Reddit(){
    this.iab.create('https://www.reddit.com/user/LeruthsTech');   
  } 
  
  Medium(){
    this.iab.create('https://medium.com/@LeruthsTech');   
  }
  
  Telegram(){
    this.iab.create('https://t.me/LeruthTech');   
  }


  BitcoinWiki(){
    this.iab.create('https://en.bitcoinwiki.org/wiki/LeruthTech');   
  }

  StartKyc_(){
    this.router.navigate(['register']);
  }

  countdown(){
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
      //  console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);
 
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


  

}
