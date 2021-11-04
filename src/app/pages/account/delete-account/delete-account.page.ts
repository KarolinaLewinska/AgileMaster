import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { AppComponent } from '../../../app.component';
import { ValidationService } from '../../../shared/validation-service';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {
  constructor(
    private userAuthenticationService: UserAuthenticationService,
    private appComponent: AppComponent,
    private validationService: ValidationService
  ) { }

  ngOnInit() {
  }

  async deleteUserAccount() {
    var currentUserPasswd = (<HTMLInputElement>document.getElementById('passwd')).value;
    var confirmCurrentUserPasswd = (<HTMLInputElement>document.getElementById('passwdConfirm')).value;
    
    if (this.validationService.checkIfPasswdFieldsAreNotEmpty(currentUserPasswd, confirmCurrentUserPasswd)) {
      await this.appComponent.createLoadingDialog();
      await this.appComponent.showLoadingDialog();
      
      try {
        this.userAuthenticationService.reauthenticateAndDeleteUserAccount(currentUserPasswd);
      } catch (error) {
        this.appComponent.showFieldValidationAlert('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby usunięcia konta');
      }
      await this.appComponent.hideLoadingDialog();
    }
   
  }

  
}
