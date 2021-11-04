import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../shared/authentication-service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
})
export class TasksPage implements OnInit {

  constructor(private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {
    
  }
}
