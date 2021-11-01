import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../shared/authentication-service';
import { UserData } from '../shared/user-data';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  userData = {} as UserData;

  constructor(private userAuthenticationService: UserAuthenticationService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController) { }

  ngOnInit() {
  }
  async recoverUserPassword(userData: UserData) {
    if (this.checkIfEmailIsNotEmpty()) {
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      this.userAuthenticationService.sendEmailToResetPassword(userData.email)
      .then((result) => {
        this.navController.navigateForward('change-passwd-confirm');
      })
      .catch((error) => {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if (errorCode == 'auth/internal-error') {
          errorMessage = 'Nieoczekiwany błąd serwera';
          this.showFieldValidationAlert(headerErrorMessage, errorMessage);
        } else {
          errorMessage ='Nieprawidłowy adres email';
          this.showFieldValidationAlert(headerErrorMessage, errorMessage);
        }
        this.navController.navigateBack('change-password');  
      });
      
      (await loadingDialog).dismiss();  
    }
  }

  checkIfEmailIsNotEmpty() {
    if (!this.userData.email) {
      this.showFieldValidationAlert('Pole wymagane', 'Adres email jest wymagany');
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
