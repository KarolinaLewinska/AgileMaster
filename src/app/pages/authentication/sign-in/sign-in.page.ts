import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { LoadingController, NavController } from '@ionic/angular';
import { UserData } from '../../../model/user-data';
import { AppComponent } from '../../../app.component';
import { ValidationService } from '../../../shared/validation-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  userData = {} as UserData;

  constructor(private loadingController: LoadingController,
    private userAuthenticationService: UserAuthenticationService,
    private appComponent: AppComponent,
    private navController: NavController, 
    private validationService: ValidationService) { }

  ngOnInit() {
  }

  async SignInUser(userData: UserData) {
    const userEmail = userData.email;
    const userPassword = userData.password;
    
    if (this.validationService.checkIfFieldsAreNotEmpty(userEmail, userPassword)) {
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        await this.userAuthenticationService.signInWithEmailAndPassword(userEmail, userPassword);
      }
      catch(error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        switch (errorCode) {
          case 'auth/user-not-found': {
            errorMessage = 'Użytkownik o podanym adresie email nie istnieje';
            this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
          case 'auth/invalid-email': {
            errorMessage = 'Nieprawidłowy format adresu email';
            this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
          case 'auth/internal-error': {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-up');
            break;
          } 
          default: {
            errorMessage ='Nieprawidłowy adres email lub hasło';
            this.appComponent.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('sign-in');
            break;
          }
        }
      }
      (await loadingDialog).dismiss();  
    }
  }
}
