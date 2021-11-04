import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { UserData } from '../../../model/user-data';
import { LoadingController, NavController } from '@ionic/angular';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  userData = {} as UserData;

  constructor(private userAuthenticationService: UserAuthenticationService,
    private appComponent: AppComponent,
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
        this.navController.navigateForward('reset-passwd-confirm');
      })
      .catch((error) => {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        if (errorCode == 'auth/internal-error') {
          errorMessage = 'Nieoczekiwany błąd serwera';
          this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
        } else {
          errorMessage ='Nieprawidłowy adres email';
          this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
        }
        this.navController.navigateBack('reset-password');  
      });
      
      (await loadingDialog).dismiss();  
    }
  }

  checkIfEmailIsNotEmpty() {
    if (!this.userData.email) {
      this.appComponent.showFieldValidationAlert('Pole wymagane', 'Wprowadź adres email');
      return false;
    }
    return true;
  }
}
