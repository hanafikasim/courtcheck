import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }

  items = [{
    start: "3:00 PM",
    day: "Monday",
    date: "September 11, 2017",
    index: 0
  },
  {
    start: "10:00 PM",
    day: "Saturday",
    date: "September 16, 2017",
    index: 1
  },
  {
    start: "8:00 PM",
    day: "Thursday",
    date: "November 9, 2017",
    index: 2
  }];

  cancelConfirm(index) {
      let alert = this.alertCtrl.create({
        title: 'Confirm cancel booking',
        message: 'Are you sure to cancel this booking?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('No clicked');
            }
          },
          {
            text: 'Sure',
            handler: () => {
              console.log('Sure clicked');
              this.items.splice(index, 1);
            }
          }
        ]
      });
      alert.present();
    }
}