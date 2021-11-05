import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics-categories.page.html',
  styleUrls: ['./statistics-categories.page.scss'],
})
export class StatisticsCategoriesPage implements OnInit {

  constructor(private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {
  }

}
