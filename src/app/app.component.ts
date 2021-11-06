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

  async showAlertDialogWithOkButton(headerValue: string, messageValue: string) {
    const alertDialog = await this.alertController.create({
      cssClass: 'alert',
      header: headerValue,
      message: messageValue,
      buttons: ['OK']
    });
    await alertDialog.present();

    await alertDialog.onDidDismiss();
  }

  async createAndShowAlertDialogWithConfirmAndCancelButton(headerValue: string, messageValue: string) {
    return new Promise (async (result) => {
      const alertDialogWithConfirm = this.alertController.create({
        cssClass: 'alert',
        header: headerValue, 
        message: messageValue,
        buttons: [
        {
          text: 'Nie',
          role: 'cancel', 
          handler: () => {
            return result(false);
          }
        },
        {
          text: 'Tak',
          handler: () => {
            return result(true);
        }
        }]});
      (await alertDialogWithConfirm).present()
    });
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
