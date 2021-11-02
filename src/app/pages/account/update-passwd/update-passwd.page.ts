import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { UserAuthenticationService } from '../../../shared/authentication-service';
import { UserData } from '../../../model/user-data';
import firebase from '@firebase/app-compat';
@Component({
  selector: 'app-update-passwd',
  templateUrl: './update-passwd.page.html',
  styleUrls: ['./update-passwd.page.scss'],
})
export class UpdatePasswdPage implements OnInit {
  userData = {
    
  } as UserData;

  constructor(private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController,
    private userAuthenticationService: UserAuthenticationService) { }

  ngOnInit() {
  }

  async updateUserPassword() {
    var newPasswd = (<HTMLInputElement>document.getElementById('newPasswd')).value;
    const headerSuccessMessage = 'Zmiana hasła';
    const successMessage = 'Pomyślnie zmieniono hasło';

    if (this.checkIfPasswordIsNotEmpty()) {
      const loadingDialog = this.loadingController.create({
        message: 'Trwa przetwarzanie...',
        duration: 3000
      });
      (await loadingDialog).present();

      try {
        if (this.reauthenticatePassword()) {
          await this.userAuthenticationService.updateUserPassword(newPasswd)
          .then((result) => {
            this.showFieldValidationAlert(headerSuccessMessage, successMessage);
          });
        } else {
          this.showFieldValidationAlert("Błąd zmiany hasła","Błąd błąd");
        }
      }
      catch(error) {
        const headerErrorMessage = 'Błąd uwierzytelniania';
        var errorCode = error.code;
        var errorMessage = error.message;
        
        switch (errorCode) {
          case 'auth/internal-error': {
            errorMessage = 'Nieoczekiwany błąd serwera';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('update-password');
            break;
          } 
          default: {
            errorMessage = 'Nieprawidłowy format hasła email';
            this.showFieldValidationAlert(headerErrorMessage, errorMessage);
            this.navController.navigateBack('update-password');
            break;
          }
        }
      }
      (await loadingDialog).dismiss();  
    }
  }
  checkIfPasswordIsNotEmpty() {
    var oldPasswd = (<HTMLInputElement>document.getElementById('oldPasswd')).value;
    var newPasswd = (<HTMLInputElement>document.getElementById('newPasswd')).value;
    if (!oldPasswd || !newPasswd) {
      this.showFieldValidationAlert('Pole wymagane', 'Wprowadź hasło');
      return false;
    }
    return true;
  }

  //działa zmiana, ale komunikaty się powielają i są źle
  async reauthenticatePassword() {
    var oldPasswd = (<HTMLInputElement>document.getElementById('oldPasswd')).value;
    var user = firebase.auth().currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, oldPasswd)
    user.reauthenticateWithCredential(credential).then(function() {
      return true;
    });
    return false;

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
