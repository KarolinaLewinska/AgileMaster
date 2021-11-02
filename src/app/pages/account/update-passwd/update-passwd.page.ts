import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../shared/authentication-service';
@Component({
  selector: 'app-update-passwd',
  templateUrl: './update-passwd.page.html',
  styleUrls: ['./update-passwd.page.scss'],
})
export class UpdatePasswdPage implements OnInit {

  constructor(private alertController: AlertController,
    private loadingController: LoadingController,
    private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {
  }

  async updateUserPassword() {
    var oldPasswd = (<HTMLInputElement>document.getElementById('oldPasswd')).value;
    var newPasswd = (<HTMLInputElement>document.getElementById('newPasswd')).value;
    var newPasswdConfirm = (<HTMLInputElement>document.getElementById('newPasswdConfirm')).value;

    if (this.checkIfFieldsAreNotEmpty()) {
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        this.userAuthenticationService.reauthenticateAndUpdateUserPassword(oldPasswd, newPasswd);
      }
      catch(error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        this.showFieldValidationAlert("Błąd zmiany hasła","Błąd błąd");
      }
      (await loadingDialog).dismiss();  
    }
  }
  checkIfFieldsAreNotEmpty() {
    var oldPasswd = (<HTMLInputElement>document.getElementById('oldPasswd')).value;
    var newPasswd = (<HTMLInputElement>document.getElementById('newPasswd')).value;
    var newPasswdConfirm = (<HTMLInputElement>document.getElementById('newPasswdConfirm')).value;
    
    if (!oldPasswd || !newPasswd || !newPasswdConfirm) {
      this.showFieldValidationAlert('Pola wymagane', 'Wypełnij wszystkie pola');
      return false;
    }
    return true;
  }

  //todo: trzeba to wydzielić 
  public async showFieldValidationAlert(headerValue: string, messageValue: string) {
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
