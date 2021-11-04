import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { UserData } from '../../../model/user-data';
import { LoadingController, NavController } from '@ionic/angular';
import { AppComponent } from '../../../app.component';
import { ValidationService } from '../../../shared/validation-service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  userData = {} as UserData;

  constructor(
    private navController: NavController,
    private loadingController: LoadingController,
    private userAuthenticationService: UserAuthenticationService,
    private appComponent: AppComponent,
    private validationService: ValidationService) { }

  ngOnInit() {
  }

  async signUpUser(userData: UserData) {
    const userEmail = userData.email;
    const userPassword = userData.password;
    var passwdValue = (<HTMLInputElement>document.getElementById('passwd')).value;
    var passwdConfirmValue = (<HTMLInputElement>document.getElementById('passwdConfirm')).value;

    if (this.validationService.checkIfAuthFieldsAreNotEmpty(userEmail, userPassword) 
      && this.validationService.checkIfPasswordIsValidated(passwdValue, passwdConfirmValue)) {
      
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        await this.userAuthenticationService.signUpWithEmailAndPassword(userEmail, userPassword);
      } catch (error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        switch (errorCode) {
          case 'auth/email-already-in-use': {
            errorMessage = 'Podany adres email został już użyty';
            this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
          case 'auth/invalid-email': {
            errorMessage = 'Nieprawidłowy format adresu email';
            this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
          case 'auth/internal-error': {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          } 
          default: {
            errorMessage = error.message;
            this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
        }
      }
      (await loadingDialog).dismiss();        
    }
  }
}
