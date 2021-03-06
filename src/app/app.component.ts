import { Component } from '@angular/core';
import { Platform, Button } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  //templateUrl: 'app.html'
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  //rootPage:any = HomePage;
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

