import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { AppComponent } from '../../../app.component';
import { ValidationService } from '../../../shared/validation-service';
@Component({
  selector: 'app-update-passwd',
  templateUrl: './update-passwd.page.html',
  styleUrls: ['./update-passwd.page.scss'],
})
export class UpdatePasswdPage implements OnInit {

  constructor(private appComponent: AppComponent,
    private loadingController: LoadingController,
    private userAuthenticationService: UserAuthenticationService,
    private validationService: ValidationService) { }

  ngOnInit() {
  }

  async updateUserPassword() {
    var oldPasswd = (<HTMLInputElement>document.getElementById('oldPasswd')).value;
    var newPasswd = (<HTMLInputElement>document.getElementById('newPasswd')).value;
    var newPasswdConfirm = (<HTMLInputElement>document.getElementById('newPasswdConfirm')).value;

    if (this.validationService.checkIfPasswdFieldsAreNotEmpty(oldPasswd, newPasswd, newPasswdConfirm) 
      && this.validationService.checkIfPasswordIsValidated(newPasswd, newPasswdConfirm)) {
      
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        this.userAuthenticationService.reauthenticateAndUpdateUserPassword(oldPasswd, newPasswd);
      }
      catch(error) {
        this.appComponent.showFieldValidationAlert('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby zmiany hasła');
      }
      (await loadingDialog).dismiss();  
    }
  }
}
