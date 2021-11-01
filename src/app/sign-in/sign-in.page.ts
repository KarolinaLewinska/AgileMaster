import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../shared/authentication-service';
import { LoadingController } from '@ionic/angular';
import { UserData } from '../shared/user-data';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  userData = {} as UserData;

  constructor(private loadingController: LoadingController,
    private userAuthenticationService: UserAuthenticationService,
    private alertController: AlertController,
    private navController: NavController) { }

  ngOnInit() {
  }

  async SignInUser(userData: UserData) {
    if (this.checkIfInputsAreNotEmpty()) {
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        await this.userAuthenticationService.signInWithEmailAndPassword(userData.email, userData.password);
      }
      catch(error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        switch (errorCode) {
          case 'auth/user-not-found': {
            errorMessage = 'Użytkownik o podanym adresie email nie istnieje';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
          case 'auth/invalid-email': {
            errorMessage = 'Nieprawidłowy format adresu email';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
          case 'auth/internal-error': {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          } 
          default: {
            errorMessage ='Nieprawidłowy adres email lub hasło';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
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
