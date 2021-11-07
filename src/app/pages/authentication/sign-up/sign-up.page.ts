import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
import { UserData } from '../../../model/user-data';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../../app.component';
import { AuthValidationService } from '../../../validation/auth-validation-service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  constructor(
    private navController: NavController,
    private userAuthenticationService: UserAuthenticationService,
    private appComponent: AppComponent,
    private authValidationService: AuthValidationService
  ) { }

  userData = {} as UserData;
  
  ngOnInit() {}

  async signUpUser(userData: UserData) {
    var userEmail = userData.email;
    var userPassword = userData.password;
    
    var passwdValue = (<HTMLInputElement>document.getElementById('passwd')).value;
    var passwdConfirmValue = (<HTMLInputElement>document.getElementById('passwdConfirm')).value;

    if (this.authValidationService.checkIfAuthFieldsAreNotEmpty(userEmail, userPassword) 
      && this.authValidationService.checkIfPasswordIsValid(passwdValue, passwdConfirmValue)
      && this.authValidationService.checkIfPasswordAndConfirmAreEqual(passwdValue, passwdConfirmValue)) {
      
      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();

      try {
        await this.userAuthenticationService.signUpWithEmailAndPassword(userEmail, userPassword);
        await this.userAuthenticationService.sendEmailToConfirmSignUp()
      } 
      catch (error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        switch (errorCode) {
          case 'auth/email-already-in-use': {
            errorMessage = 'Użytkownik o podanym adresie email już istnieje';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
          case 'auth/invalid-email': {
            errorMessage = 'Nieprawidłowy format adresu email';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
          case 'auth/internal-error': {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          } 
          default: {
            errorMessage = error.message;
            this.appComponent.showAlertDialogWithOkButton(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
        }
      }
      this.appComponent.hideLoadingDialog();        
    }
  }
}
