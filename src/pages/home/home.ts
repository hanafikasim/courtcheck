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
    masa
    startTime;
    endTime;
    dayNight;
    timeSlot;

    isToday:boolean;

    books : FirebaseListObservable<any[]>;

    // Constructor
    constructor(
        private navController:NavController,
        private alertCtrl: AlertController,
        public navCtrl: NavController,
        public db: AngularFireDatabase,
    ) {
       this.books = db.list('/Books');
       
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
    timeSlotAlert() {
      let alert = this.alertCtrl.create({
        title: 'Close time',
        message: 'Time slot available from 8:00 AM to 10:00 PM.',
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
    bookingConfirm() {
      let alert = this.alertCtrl.create({
        title: 'Confirm book',
        message: 'Do you want to book this slot?',
        subTitle: 'Time slot: ' + this.timeSlot + ':00 ' + this.dayNight,
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
              this.onCreateEvent();
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

    onCreateEvent(){
        console.log("Hour : " + this.masa.getHours());
        
        // switch(this.masa.get){
        //     case 17
        // }

        this.books.push({
                  name: "Hanafi",
                  year: this.masa.getFullYear(),
                  month: this.masa.getMonth(),
                  day:  this.masa.getDate(),
                  hour: this.masa.getHours(),
                  date: (new Date(this.masa.getFullYear(), this.masa.getMonth(), this.masa.getDate())).toString() 
        })

        this.updateEvent();

        for(var i=0; i<this.events.length; i++){
             console.log(this.events[i]);  
        }

        //location.reload();
    }

    updateEvent(){
        this.events = [];

        this.db.list('/Books', {preserveSnapshot: true})
        .subscribe(snapshots =>{
            snapshots.forEach(snapshots => {
                // console.log(snapshots.key, snapshots.val().name);
                this.events.push({
                    title: snapshots.val().name,
                    startTime: new Date(snapshots.val().year, snapshots.val().month, snapshots.val().day, snapshots.val().hour),
                    endTime: new Date(snapshots.val().year, snapshots.val().month, snapshots.val().day, snapshots.val().hour + 1),
                    allDay: false
                })
            })
        })

        this.eventSource = this.events;
    }

    onTimeSelected(ev) {

        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
         this.masa = new Date(ev.selectedTime);
         console.log("Today is " + this.masa);

         if(this.masa.getHours()>=8 && this.masa.getHours()<=22){
           if(this.declineBook == true){
               if(this.masa.getHours()>= 0 && this.masa.getHours()<=11){
                   this.timeSlot = this.masa.getHours();
                   this.dayNight = "AM"
                }
               else if(this.masa.getHours()>= 12 && this.masa.getHours()<=23){
                   if(this.masa.getHours()>= 13 && this.masa.getHours()<=23){
                       this.timeSlot = this.masa.getHours() - 12;
                   }
                   else{
                       this.timeSlot = this.masa.getHours();
                   }
                   this.dayNight = "PM"
                }

               this.bookingConfirm();                
           }
           this.declineBook = true;           
         }
         else
         {
            this.timeSlotAlert();
         }

         //location.reload();
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
