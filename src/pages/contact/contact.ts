import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage{
  constructor(public navCtrl: NavController) {

  }

  news = [
    {
      img: "https://www.askideas.com/media/30/Happy-Labour-Day-Malaysia.jpg",
      title: "Labour Day",
      desc: "Sports Hall will close on 1st May 2017."
    },
    {
      img: "http://www.utm.my/sports/files/2017/04/Banner-USG-2017.jpg",
      title: "UTM Staff Game 2017",
      desc: "Visit www.utm.my/sports for more info."
    }
    
  ];
}