import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
import { AppComponent } from '../../../app.component';
import { AuthValidationService } from '../../../validation/auth-validation-service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {
  constructor(
    private appComponent: AppComponent,
    private userAuthenticationService: UserAuthenticationService,
    private authValidationService: AuthValidationService) { }

  ngOnInit() {}

  async updateEmail() {
    var newEmail = (<HTMLInputElement>document.getElementById('emailInput')).value;
    var currentUserPassword = (<HTMLInputElement>document.getElementById('currentPasswd')).value;

    if (this.authValidationService.checkIfEmailIsValid(newEmail)) {

      try {
        await this.userAuthenticationService.reauthenticateAndUpdateUserEmail(currentUserPassword, newEmail);
        //co jak zmienie email a juz jest inne konto do teego? 
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby zmiany adresu email');
      }
    }
  }
}
