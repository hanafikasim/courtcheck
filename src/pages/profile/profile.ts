import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }

  user = {
    nickname: "hanafikasim",
    fullname: "Mohamed Hanafi Bin Mohamad Kasim",
    phone: "012-345 6789",
    email: "hanafikasim@courtcheck.my"
  }
}