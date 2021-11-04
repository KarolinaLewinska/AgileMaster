import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../services/authentication-service';
import { AppComponent } from '../../../app.component';
import { ValidationService } from '../../../services/validation-service';

@Component({
  selector: 'app-update-email',
  templateUrl: './update-email.page.html',
  styleUrls: ['./update-email.page.scss'],
})
export class UpdateEmailPage implements OnInit {
  constructor(
    private appComponent: AppComponent,
    private userAuthenticationService: UserAuthenticationService,
    private validationService: ValidationService) { }

  ngOnInit() {
  }

  async updateEmail() {
    var newEmail = (<HTMLInputElement>document.getElementById('emailInput')).value;
    var currentUserPassword = (<HTMLInputElement>document.getElementById('currentPasswd')).value;
    
    if (this.validationService.checkIfEmailIsValid(newEmail)) {
      await this.appComponent.createLoadingDialog();
      await this.appComponent.showLoadingDialog();

      try {
        await this.userAuthenticationService.reauthenticateAndUpdateUserEmail(currentUserPassword, newEmail);
      }
      catch(error) {
        this.appComponent.showFieldValidationAlert('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby zmiany adresu email');
      }
      await this.appComponent.hideLoadingDialog(); 
    }
  }
}
