import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private alertController: AlertController) {}

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

  async showFieldValidationAlertWithConfirm(headerValue: string, messageValue: string) {
    const alertDialog = await this.alertController.create({
      cssClass: 'confirmAlert',
      header: headerValue, //Usuń konto w deleteAccount
      message: messageValue, //Czy na pewno chcesz usunąć konto?
      buttons: [
      {
        text: 'Nie',
        role: 'cancel', //const { role } = await alert.onDidDismiss();
        cssClass: 'secondary',
        handler: (blah) => {
            console.log('Confirm Cancel: blah');
        },
      },
      {
        text: 'Tak',
        handler: () => {
            console.log('Confirm Okay');
        }
      }]});

    await alertDialog.present();

    await alertDialog.onDidDismiss();
  }
}
