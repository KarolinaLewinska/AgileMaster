import { Injectable } from "@angular/core";
//import { AppComponent } from '../app.component';
//import { AngularFirestore } from '@angular/fire/compat/firestore';
//import firebase from '@firebase/app-compat';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventData } from '../model/event-data';

@Injectable({
    providedIn: 'root',
})
export class EventsService {
    constructor(
        // private appComponent: AppComponent,
        //private angularFirestore: AngularFirestore,
        private navController: NavController) {
    }
    eventData = {} as EventData;
    //currentUser = firebase.auth().currentUser;

    navigateToDetails(details) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            eventData: details
          }
        };
        this.navController.navigateForward('event-details', navigationExtras);
    }

}