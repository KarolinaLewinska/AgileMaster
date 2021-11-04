import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root',
})

export class UserAuthenticationService {
  private dataOfUser: any;
  public isLoggedIn: boolean;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private navController: NavController,
    public appComponent: AppComponent) {
      this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.dataOfUser = user;
        localStorage.setItem('user', JSON.stringify(this.dataOfUser));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  
  signInWithEmailAndPassword(email, password) {
    this.isLoggedIn = true;
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.navController.navigateForward('tasks');
    });
  }

  signUpWithEmailAndPassword(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.navController.navigateBack('sign-up-confirm');
    });
  }

  sendEmailToResetPassword(email) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  updateUserEmail(email) {
    firebase.auth().currentUser.reauthenticateWithCredential; //to moze trzeba będzie wyłączyć jak pole z hasłem dodamy
    return firebase.auth().currentUser.updateEmail(email)
    .then((result) => {
      this.navController.navigateBack('account-settings');
    });
  }

  async reauthenticateAndUpdateUserPassword(oldPassword, newPassword) {
    const currentUser = await firebase.auth().currentUser;
    const currentUserData = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, oldPassword)
    var authUserResult = await currentUser.reauthenticateWithCredential(currentUserData)
      .then(() => {
        firebase.auth().currentUser.updatePassword(newPassword);
        this.appComponent.showFieldValidationAlert('Zmiana hasła', 'Pomyślnie zmieniono hasło');
        this.navController.navigateBack('account-settings');

      }). catch((error) => {
        this.appComponent.showFieldValidationAlert("Błąd","Nieprawidłowa wartość bieżącego hasła");
      });
        
  }
  //może niepotrzebne
  checkIfUserIsLoggedIn() {
    if (this.isLoggedIn == true) {
      return true;
    }
    return false;
  }
}