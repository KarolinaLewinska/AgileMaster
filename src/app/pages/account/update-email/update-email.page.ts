import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { UserData } from '../../../model/user-data';
import { AppComponent } from '../../../app.component';
import { ValidationService } from '../../../shared/validation-service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {
  userData = {} as UserData;

  constructor(private loadingController: LoadingController,
    private appComponent: AppComponent,
    private userAuthenticationService: UserAuthenticationService,
    private validationService: ValidationService) { }

  ngOnInit() {
  }

  async updateEmail() {
    var newEmail = (<HTMLInputElement>document.getElementById('emailInput')).value;
    var currentUserPassword = (<HTMLInputElement>document.getElementById('currentPasswd')).value;
    
    if (this.validationService.checkIfEmailIsValidated(newEmail)) {
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        await this.userAuthenticationService.reauthenticateAndUpdateUserEmail(currentUserPassword, newEmail);
      }
      catch(error) {
        this.appComponent.showFieldValidationAlert('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby zmiany adresu email');
      }
      (await loadingDialog).dismiss();  
    }
  }
}
