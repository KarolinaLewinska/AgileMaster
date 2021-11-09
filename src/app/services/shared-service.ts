import { Injectable } from "@angular/core";
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { EventData } from '../model/event-data';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    constructor(private navController: NavController) {
    }

    navigateToEventDetails(details) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            eventData: details
          }
        };
        this.navController.navigateForward('event-details', navigationExtras);
    }

    navigateToTaskDetails(details) {
        let navigationExtras: NavigationExtras = {
          queryParams: {
            taskData: details
          }
        };
        this.navController.navigateForward('task-details', navigationExtras);
    }

}