import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../shared/authentication-service';
import { LoadingController } from '@ionic/angular';
import { UserData } from '../shared/user-data';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

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
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async signUpUser(userData: UserData) {
    if (this.checkIfInputsAreNotEmpty() && this.checkIfPasswordIsValidated()) {
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        await this.userAuthenticationService.signUpWithEmailAndPassword(userData.email, userData.password);
      } catch (error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        switch (errorCode) {
          case 'auth/email-already-in-use': {
            errorMessage = 'Podany adres email został już użyty';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
          case 'auth/invalid-email': {
            errorMessage = 'Nieprawidłowy format adresu email';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
          case 'auth/internal-error': {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          } 
          default: {
            errorMessage = error.message;
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          }
        }
      }
      (await loadingDialog).dismiss();        
    }
  }

  checkIfInputsAreNotEmpty() {
    if (!this.userData.email) {
      this.showFieldValidationAlert('Pole wymagane', 'Adres email jest wymagany');
      return false;
    }
    if (!this.userData.password) {
      this.showFieldValidationAlert('Pole wymagane','Hasło jest wymagane');
      return false;
    }
    return true;
  }

  checkIfPasswordIsValidated() {
    var passwdValue = (<HTMLInputElement>document.getElementById('passwd')).value;
    var passwdConfirmValue = (<HTMLInputElement>document.getElementById('passwdConfirm')).value;
    const headerErrorMessage = 'Nieprawidłowe hasło';
    if (passwdValue.length < 6 ) {
      this.showFieldValidationAlert(headerErrorMessage,'Hasło musi zawierać co najmniej 6 znaków');
      return false;
    }
    if (passwdValue.search(/.*?[A-Z]/)) {
      this.showFieldValidationAlert(headerErrorMessage,'Hasło musi zawierać co najmniej jedną dużą literę');
      return false;
    }
    if (passwdValue != passwdConfirmValue) {
      this.showFieldValidationAlert('Różne hasła','Podane wartości haseł nie są takie same');
      return false;
    }
    return true;
  }

  async showFieldValidationAlert(headerValue: string, messageValue: string) {
    const alertDialog = await this.alertController.create({
      cssClass: 'validationAlert',
      header: headerValue,
      message: messageValue,
      buttons: ['OK']
    });
    await alertDialog.present();

    await alertDialog.onDidDismiss();
  }
}
