import { Component, OnInit } from '@angular/core';
import { UserAuthenticationService } from '../shared/authentication-service';
import { LoadingController } from '@ionic/angular';
import { UserData } from '../shared/user-model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  userData = {} as UserData;

  constructor(
    private loadingController: LoadingController,
    private userAuthenticationService: UserAuthenticationService,
    private alertController: AlertController) { }

  ngOnInit() {
  }

  async showValidationAlert() {
    const alert = await this.alertController.create({
      cssClass: 'validationAlert',
      header: "Pole wymagane",
      message: 'Adres email jest wymagany!',
      buttons: ['OK']
    });
    await alert.present();

    await alert.onDidDismiss();
  }
}
