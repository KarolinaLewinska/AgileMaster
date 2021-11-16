import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
@Component({
  selector: 'app-events',
  templateUrl: './events-categories.page.html',
  styleUrls: ['./events-categories.page.scss'],
})
export class EventsCategoriesPage implements OnInit {
  constructor(private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {}
}
