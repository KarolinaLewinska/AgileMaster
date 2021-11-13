import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { EventData } from '../../../model/event-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { EventsValidationService } from '../../../validation/events-validation-service';
import { SharedService } from '../../../services/shared-service';
@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.page.html',
  styleUrls: ['./edit-event.page.scss'],
})
export class EditEventPage implements OnInit {
  eventData = {} as EventData;
  id: any;
  category: any;
  currentUser = firebase.auth().currentUser;

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private sharedService: SharedService,
    private eventsValidationService: EventsValidationService,
    private activatedRoute: ActivatedRoute) { 
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.category = this.activatedRoute.snapshot.paramMap.get('category');
    }

  ngOnInit() {
    this.getEventToEditData(this.id);
  }

  async getEventToEditData(id: string) {
    this.appComponent.createLoadingDialog();
    this.appComponent.showLoadingDialog();
    
    this.angularFirestore.collection('users').doc(this.currentUser.uid)
      .collection('events').doc('category').collection(this.sharedService.setEventCategoryName(this.category)).doc(id).valueChanges()
      .subscribe(event => {
        this.eventData.name = event['name'];
        this.eventData.description = event['description'];
        this.eventData.date = event['date'];
        this.eventData.startTime = event['startTime'];
        this.eventData.duration = event['duration']; 
        this.eventData.place = event['place'];
        this.eventData.category = event['category'];
      });
    this.appComponent.hideLoadingDialog();
  }

  async editEventData(eventData: EventData) {
    if (this.eventsValidationService.checkIfEventsFieldsAreNotEmpty(this.eventData.name, 
      this.eventData.date, this.eventData.startTime, this.eventData.duration, this.eventData.place, this.eventData.category)) {
        
      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();
      
      try {
        if (this.category == this.eventData.category) { 
          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('events')
            .doc('category').collection(this.sharedService.setEventCategoryName(this.category)).doc(this.id).update(eventData);
        } else {
          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('events')
            .doc('category').collection(this.sharedService.setEventCategoryName(this.eventData.category)).add(eventData);

          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('events')
            .doc('category').collection(this.sharedService.setEventCategoryName(this.category)).doc(this.id).delete();
        }
        this.appComponent.showAlertDialogWithOkButton('Edycja zadania', 'Zaktualizowano zadanie');
        this.sharedService.navigateBackToEventsList(this.eventData.category);
      } 
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby edycji zadania');
      }
      this.appComponent.hideLoadingDialog();
    }
  }

  navigateBackFromDetailsToList() {
    this.sharedService.navigateBackToEventsList(this.category.valueOf())
  }
}
