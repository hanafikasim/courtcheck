import { Component } from '@angular/core';
import { NavController, AlertController  } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    

    // Declare variables
    eventSource;
    viewTitle;
    events =  [];
    declineBook = true;
    counter = 0;

    isToday:boolean;

    items: FirebaseListObservable<any[]>;
    // Constructor
    constructor(private navController:NavController, private alertCtrl: AlertController, public db: AngularFireDatabase) {

    }

    // Set calendar properties
    calendar = {
        mode: 'day',
        currentDate: new Date(),
        dateFormatter: {
            formatMonthViewDay: function(date:Date) {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: function(date:Date) {
                return 'MonMH';
            },
            formatMonthViewTitle: function(date:Date) {
                return 'testMT';
            },
            formatWeekViewDayHeader: function(date:Date) {
                return 'MonWH';
            },
            formatWeekViewTitle: function(date:Date) {
                return 'testWT';
            },
            formatWeekViewHourColumn: function(date:Date) {
                return 'testWH';
            },
            formatDayViewHourColumn: function(date:Date) {
                return 'testDH';
            },
            formatDayViewTitle: function(date:Date) {
                return 'testDT';
            }
        }
    };
    

    //=================
    // Alert functions
    //=================

    // Not available time slot alert
    presentAlert() {
      let alert = this.alertCtrl.create({
        title: 'Close time',
        subTitle: 'Slot time available from 8AM to 10PM.',
        buttons: ['Got it!']
      });
      alert.present();
    }

    // Booked time slot alert
    bookedAlert() {
      let alert = this.alertCtrl.create({
        title: 'Booked!',
        subTitle: 'Slot time dah book',
        buttons: ['Got it!']
      });
      alert.present();
    }

    // Confirm book alert
    presentConfirm() {
      let alert = this.alertCtrl.create({
        title: 'Confirm book',
        message: 'Do you want to book this slot?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Book',
            handler: () => {
              console.log('Book clicked');
            }
          }
        ]
      });
      alert.present();
    }

    //====================
    // Calendar functions
    //====================

    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    onEventSelected(event) {
        
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
        this.declineBook = false;
        this.bookedAlert();
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    onTimeSelected(ev) {
         var eventsReset = [];
         //var startDay = 1;
         //var endDay = 1;
         var startTime;
         var endTime;

        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
        var masa = new Date(ev.selectedTime);
         console.log("Today is " + masa);

         if(masa.getHours()>=8 &&masa.getHours()<=22){
           if(this.declineBook == true){
                startTime = new Date(masa.getFullYear(), masa.getMonth(), masa.getDate(),  masa.getHours() );
                endTime = new Date(masa.getFullYear(), masa.getMonth(), masa.getDate(),  masa.getHours()+1);

                console.log("Hour : " + masa.getHours());

                this.events.push({
                            title: 'Book' + this.counter,
                            startTime: startTime,
                            endTime: endTime,
                            allDay: false
                            
                });
                this.counter+=1;
                this.eventSource = this.events;
                
           }
           this.declineBook = true;    

           for(var i=0; i<this.events.length; i++){
             console.log(this.events[i]);  
           }
           
         }
         else
         {
            this.presentAlert();
         }

         
    }

    //=================
    // Unused function
    //=================

    loadEvents() {
        //this.eventSource = this.createRandomEvents();
        //this.eventSource = this.events;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onCurrentDateChanged(event:Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    createRandomEvents() {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            } else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                    
                });
            }
        }
        return events;
    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    markDisabled = (date:Date) => {
        var current = new Date();
        current.setHours(0, 0, 0);
        return date < current;
    };

}
