import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../services/authentication-service';
@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
})
export class EventsPage implements OnInit {

  constructor(private userAuthenticationService: UserAuthenticationService) { }
 
  ngOnInit() {
    
  }
}
