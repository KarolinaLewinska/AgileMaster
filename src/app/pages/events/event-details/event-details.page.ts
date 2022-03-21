import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventData } from '../../../model/event-data';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService) { }

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
    this.sharedService.navigateBackToEventsList(this.eventData.category.valueOf());
  }
}
