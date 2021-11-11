import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventData } from '../../../model/event-data';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController
  ) { }
  eventData = {} as EventData;
  
  ngOnInit() {
    this.displayEventDetails();
  }

  displayEventDetails() {
    this.activatedRoute.queryParams.subscribe(params => {
    this.eventData = params['eventData']
    });
  }

  navigateBackFromDetailsToList() {
    switch (this.eventData.category.valueOf()) {
      case 'Spotkania Scrumowe': { //nie działa
        this.navController.navigateBack('scrumMeetings');
        break;
      }
      case 'Szkolenia': {
        this.navController.navigateBack('courses');
        break;
      }
      case 'Warsztaty': {
        this.navController.navigateBack('workshops');
        break;
      }
      default: {
        this.navController.navigateBack('other-events');
        break;
      }
    }
  }
}
