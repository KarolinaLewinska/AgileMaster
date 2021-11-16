import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
import { AppComponent } from '../../../app.component';
import { AuthValidationService } from '../../../validation/auth-validation-service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {
  constructor(
    private userAuthenticationService: UserAuthenticationService,
    private appComponent: AppComponent,
    private authValidationService: AuthValidationService
  ) { }

  ngOnInit() {}

  async deleteUserAccount() {
    var currentUserPasswd = (<HTMLInputElement>document.getElementById('passwd')).value;
    var confirmCurrentUserPasswd = (<HTMLInputElement>document.getElementById('passwdConfirm')).value;
    var wantsToDelete = true;

    if (this.authValidationService.checkIfPasswdFieldsAreNotEmpty(currentUserPasswd, confirmCurrentUserPasswd)
      && this.authValidationService.checkIfPasswordAndConfirmAreEqual(currentUserPasswd, confirmCurrentUserPasswd)) {

      if (wantsToDelete) {
        const dialog = await this.appComponent.createAndShowAlertDialogWithConfirmAndCancelButton('Usuń konto', 'Czy na pewno chcesz usunąć konto?');
        if (!dialog) {
          return;
        }
      }

      try {
        this.userAuthenticationService.reauthenticateAndDeleteUserAccount(currentUserPasswd);
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby usunięcia konta');
      }
    }
  }
}
