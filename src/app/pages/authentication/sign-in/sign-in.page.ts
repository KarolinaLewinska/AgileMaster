import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
import { NavController } from '@ionic/angular';
import { UserData } from '../../../model/user-data';
import { AppComponent } from '../../../app.component';
import { AuthValidationService } from '../../../validation/auth-validation-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  constructor(
    private userAuthenticationService: UserAuthenticationService,
    private appComponent: AppComponent,
    private navController: NavController,
    private authValidationService: AuthValidationService) { }

  userData = {} as UserData;

  ngOnInit() {}

  async SignInUser(userData: UserData) {
    var userEmail = userData.email;
    var userPassword = userData.password;

    if (this.authValidationService.checkIfAuthFieldsAreNotEmpty(userEmail, userPassword)) {
      try {
        await this.userAuthenticationService.signInWithEmailAndPassword(userEmail, userPassword);
      } catch (error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;

        switch (errorCode) {
          case 'auth/user-not-found': {
            errorMessage = 'Użytkownik o podanym adresie email nie istnieje';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
          case 'auth/invalid-email': {
            errorMessage = 'Nieprawidłowy format adresu email';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
          case 'auth/internal-error': {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
          default: {
            errorMessage ='Nieprawidłowy adres email lub hasło';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
        }
      }
    }
  }
}
