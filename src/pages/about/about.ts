import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

  }


  cancelConfirm() {
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
            }
          }
        ]
      });
      alert.present();
    }
}