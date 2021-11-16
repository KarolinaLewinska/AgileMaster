import { Component, OnInit } from '@angular/core';
import { EventsValidationService } from '../../../validation/events-validation-service';
import { EventData } from '../../../model/event-data';
import firebase from '@firebase/app-compat';
import { AppComponent } from '../../../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {

  constructor(
    private eventsValidationService: EventsValidationService,
    private appComponent: AppComponent,
    private angularFirestore: AngularFirestore
  ) { }

  eventData = {} as EventData;

  ngOnInit() {}

  async addEvent(eventData: EventData) {
    if (this.eventsValidationService.checkIfEventsFieldsAreNotEmpty(this.eventData.name, this.eventData.date,
      this.eventData.startTime, this.eventData.duration, this.eventData.place, this.eventData.category)) {

      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();

      try {
        var currentUser = firebase.auth().currentUser;
        await this.angularFirestore.collection('users').doc(currentUser.uid).collection('events')
          .doc('category').collection(this.setCategoryName()).add(eventData);

        this.appComponent.showAlertDialogWithOkButton('Dodano spotkanie', 'Pomyślnie dodano spotkanie');
        this.clearInputFields();
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby dodania spotkania');
      }
      this.appComponent.hideLoadingDialog();
    }
  }

  setCategoryName() {
    var nameOfCategory = "";

    switch (this.eventData.category) {
      case 'Spotkania Scrumowe':
        nameOfCategory = 'scrumMeetings';
        break;
      case 'Szkolenia':
        nameOfCategory = 'courses';
        break;
      case 'Warsztaty':
        nameOfCategory = 'workshops';
        break;
      default:
        nameOfCategory = 'otherEvents';
        break;
    }
    return nameOfCategory;
  }

  clearInputFields() {
    const emptyValue = null;
    this.eventData.name = emptyValue;
    this.eventData.description = emptyValue;
    this.eventData.date = emptyValue;
    this.eventData.startTime = emptyValue;
    this.eventData.duration = emptyValue;
    this.eventData.place = emptyValue;
    this.eventData.category = emptyValue;
  }
}
