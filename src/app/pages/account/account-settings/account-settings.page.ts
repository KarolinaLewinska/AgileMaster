import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';

@Component({
  selector: 'app-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit {
  constructor(
    private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {
  }

}
