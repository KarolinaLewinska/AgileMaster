import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams-projects-categories.page.html',
  styleUrls: ['./teams-projects-categories.page.scss'],
})
export class TeamsProjectsCategoriesPage implements OnInit {
  constructor(private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {}

}
