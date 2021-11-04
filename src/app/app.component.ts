import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController,
    private loadingController: LoadingController) {}

  async showFieldValidationAlert(headerValue: string, messageValue: string) {
    const alertDialog = await this.alertController.create({
      cssClass: 'alert',
      header: headerValue,
      message: messageValue,
      buttons: ['OK']
    });
    await alertDialog.present();

    await alertDialog.onDidDismiss();
  }

  async createAndShowAlertDialogWithConfirmAndCancelButtons(headerValue: string, messageValue: string) {
    return new Promise (async (resolve) => {
      const alertDialog = this.alertController.create({
        cssClass: 'alert',
        header: headerValue, 
        message: messageValue,
        buttons: [
        {
          text: 'Nie',
          role: 'cancel', 
          cssClass: 'secondary',
          handler: () => {
            return resolve(false);
          }
        },
        {
          text: 'Tak',
          cssClass: 'secondary',
          handler: () => {
            return resolve(true);
        }
        }]});
      (await alertDialog).present()
    });
  }

  // async showAlertDialogWithConfirmAndCancelButtons(alertDialog) {
  //   await alertDialog.present();
  // }
  
  async hideAlertWithConfirm(alertDialog) {
    await alertDialog.onDidDismiss();
  }

  async createLoadingDialog() {
    var loadingDialog = this.loadingController.create({
      message: 'Trwa przetwarzanie...',
      duration: 100
    });
    return loadingDialog;
  }

  async showLoadingDialog() {
    (await this.createLoadingDialog()).present();
  }

  async hideLoadingDialog() {
    (await this.createLoadingDialog()).dismiss();    
  }
}
