import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  books : FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public db: AngularFireDatabase,
    ) {
      this.books = db.list('/Books');
  }

  cancelConfirm(bookID) {
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
            handler: data => {
              console.log('Sure clicked');
              this.books.remove(bookID);
            }
          }
        ]
      });
      alert.present();
    }
}