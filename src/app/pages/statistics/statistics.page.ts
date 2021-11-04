import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../shared/authentication-service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {

  constructor(private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {
  }

}
