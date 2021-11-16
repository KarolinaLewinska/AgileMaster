import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
import { AppComponent } from '../../../app.component';
import { AuthValidationService } from '../../../validation/auth-validation-service';
@Component({
  selector: 'app-update-passwd',
  templateUrl: './update-passwd.page.html',
  styleUrls: ['./update-passwd.page.scss'],
})
export class UpdatePasswdPage implements OnInit {
  constructor(
    private appComponent: AppComponent,
    private userAuthenticationService: UserAuthenticationService,
    private authValidationService: AuthValidationService) { }

  ngOnInit() {}

  async updateUserPassword() {
    var oldPasswd = (<HTMLInputElement>document.getElementById('oldPasswd')).value;
    var newPasswd = (<HTMLInputElement>document.getElementById('newPasswd')).value;
    var newPasswdConfirm = (<HTMLInputElement>document.getElementById('newPasswdConfirm')).value;

    if (this.authValidationService.checkIfPasswdFieldsAreNotEmpty(oldPasswd, newPasswd, newPasswdConfirm)
      && this.authValidationService.checkIfPasswordIsValid(newPasswd)
      && this.authValidationService.checkIfPasswordAndConfirmAreEqual(newPasswd, newPasswdConfirm)) {

      try {
        this.userAuthenticationService.reauthenticateAndUpdateUserPassword(oldPasswd, newPasswd);
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby zmiany hasła');
      }
    }
  }
}
