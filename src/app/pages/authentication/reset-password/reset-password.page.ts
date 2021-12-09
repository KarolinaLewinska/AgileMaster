import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
import { UserData } from '../../../model/user-data';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../../app.component';
import { AuthValidationService } from '../../../validation/auth-validation-service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  constructor(
    private userAuthenticationService: UserAuthenticationService,
    private appComponent: AppComponent,
    private navController: NavController,
    private authValidationService: AuthValidationService) { }

  userData = {} as UserData;

  ngOnInit() {}

  async recoverUserPassword(userData: UserData) {
    var userEmail = userData.email;

    if (this.authValidationService.checkIfEmailIsValidAndNotEmpty(userEmail)) {

      this.userAuthenticationService.sendEmailToResetPassword(userEmail)
      .then(() => {
        this.navController.navigateForward('reset-passwd-confirm');
      })
      .catch(error => {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;

        switch(errorCode) {
          case('auth/internal-error'): {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            break;
          }
          case('auth/invalid-email'): {
            errorMessage ='Nieprawidłowy format adresu email';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            break;
          }
          default: {
            errorMessage = 'Konto z podanym adresem email nie istnieje';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            break;
          }
        }
        this.navController.navigateBack('reset-password');
      });
    }
  }
}
