import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { UserData } from '../../../model/user-data';
import { NavController } from '@ionic/angular';
import { AppComponent } from '../../../app.component';
import { ValidationService } from '../../../shared/validation-service';

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
    private validationService: ValidationService) { }
  
  userData = {} as UserData;
  
  ngOnInit() {
  }

  async recoverUserPassword(userData: UserData) {
    var userEmail = userData.email;
    if (this.validationService.checkIfAuthFieldsAreNotEmpty(userEmail)) {
      
      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();

      this.userAuthenticationService.sendEmailToResetPassword(userEmail)
      .then(() => {
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
      this.appComponent.hideLoadingDialog();
    }
  }
}
