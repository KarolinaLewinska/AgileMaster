import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams-projects-list.page.html',
  styleUrls: ['./teams-projects-list.page.scss'],
})
export class TeamsProjectsListPage implements OnInit {

  constructor(private userAuthenticationService: UserAuthenticationService) { }
  
  ngOnInit() {
  }

}
