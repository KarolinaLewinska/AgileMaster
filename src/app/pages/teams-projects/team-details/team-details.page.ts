import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamData } from '../../../model/team-data';
@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  teamData = {} as TeamData;
  
  ngOnInit() {
    this.displayTeamDetails();
  }

  displayTeamDetails() {
    this.activatedRoute.queryParams.subscribe(params => {
    this.teamData = params['teamData']
    });
  }
}
