import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks-categories.page.html',
  styleUrls: ['./tasks-categories.page.scss'],
})
export class TasksCategoriesPage implements OnInit {
  constructor(private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {}
}
