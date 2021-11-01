import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { UserData } from '../../../model/user-data';
import firebase from '@firebase/app-compat';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {
  userData = {
    email: firebase.auth().currentUser.email,
  } as UserData;

  constructor(private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController,
    private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {
  }

  async updateEmail() {
    var email = (<HTMLInputElement>document.getElementById('emailInput')).value;
    const headerSuccessMessage = 'Zmiana adresu email';
    const successMessage = 'Pomyślnie zmieniono adres email'
    if (this.checkIfEmailIsNotEmptyOrCurrentlyUsed()) {
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        await this.userAuthenticationService.updateUserEmail(email)
        .then((result) => {
          this.showFieldValidationAlert(headerSuccessMessage, successMessage);
        });
      }
      catch(error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        switch (errorCode) {
          case 'auth/internal-error': {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('update-email');
            break;
          } 
          default: {
            errorMessage = 'Nieprawidłowy format adresu email';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('update-email');
            break;
          }
        }
      }
      (await loadingDialog).dismiss();  
    }
  }
  
  checkIfEmailIsNotEmptyOrCurrentlyUsed() {
    var email = (<HTMLInputElement>document.getElementById('emailInput')).value;
    if (!email) {
      this.showFieldValidationAlert('Pole wymagane', 'Wprowadź adres email');
      return false;
    }
    if (email == this.userData.email) {
      this.showFieldValidationAlert('Błąd uwierzytelniania', 'Podany adres email jest obecnie przypisany do konta');
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
