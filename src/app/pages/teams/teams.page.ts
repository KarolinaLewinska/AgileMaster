import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../shared/authentication-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  constructor(private userAuthenticationService: UserAuthenticationService) { }
  
  ngOnInit() {
  }

}
