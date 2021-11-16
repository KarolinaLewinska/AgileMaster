import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-events-statistics',
  templateUrl: './events-statistics.page.html',
  styleUrls: ['./events-statistics.page.scss'],
})
export class EventsStatisticsPage implements OnInit {
  constructor(private angularFirestore: AngularFirestore) { }

  currentUser = firebase.auth().currentUser;
  listOfCategories: string[] = ['scrumMeetings', 'workshops', 'courses', 'otherEvents'];

  allEventsNumber: any;
  scrumMeetingsEventsNumber: any;
  workshopsEventsNumber: any;
  coursesEventsNumber: any;
  otherEventsNumber: any;

  ngOnInit() {
    this.retrieveAllEventsNumber();
    this.retrieveEventsNumberByScrumMeetingsCategory();
    this.retrieveEventsNumberByWorkshopCategory();
    this.retrieveEventsNumberByCoursesCategory()
    this.retrieveOtherEventsNumber();
  }

  async retrieveAllEventsNumber() {
    let totalNumber = 0;
    for (var i = 0; this.listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('events')
        .doc('category').collection(this.listOfCategories[i]).get()
        .then(data => {
        var numberOfEvents = data.size;
        totalNumber += numberOfEvents;
        this.allEventsNumber = totalNumber;
        });
    }
  }

  async retrieveEventsNumberByScrumMeetingsCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('events')
      .doc('category').collection('scrumMeetings').get()
      .then(data => {
      var numberOfEvents = data.size;
      this.scrumMeetingsEventsNumber = numberOfEvents;
    });
  }

  async retrieveEventsNumberByWorkshopCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('events')
      .doc('category').collection('workshops').get()
      .then(data => {
      var numberOfEvents = data.size;
      this.workshopsEventsNumber = numberOfEvents;
    });
  }

  async retrieveEventsNumberByCoursesCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('events')
      .doc('category').collection('courses').get()
      .then(data => {
      var numberOfEvents = data.size;
      this.coursesEventsNumber = numberOfEvents;
    });
  }

  async retrieveOtherEventsNumber() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('events')
      .doc('category').collection('otherEvents').get()
      .then(data => {
      var numberOfEvents = data.size;
      this.otherEventsNumber = numberOfEvents;
    });
  }
}
