import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.page.html',
  styleUrls: ['./delete-account.page.scss'],
})
export class DeleteAccountPage implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {
  }

  async showFieldValidationAlert() {
    const alertDialog = await this.alertController.create({
      cssClass: 'confirmAlert',
      header: "Usuń konto",
      message: "Czy na pewno chcesz usunąć konto?",
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
      }
      ]
    });

    await alertDialog.present();

    await alertDialog.onDidDismiss();
  }
}
