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
    .then(() => {
      this.navController.navigateForward('tasks');
    });
  }

  signUpWithEmailAndPassword(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      this.navController.navigateBack('sign-up-confirm');
    });
  }

  sendEmailToResetPassword(email) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  reauthenticateAndUpdateUserEmail(password: string, newEmail: string) {
    this.reauthenticateCurrentUser(password)
    .then(() => {
      firebase.auth().currentUser.updateEmail(newEmail);
      this.navController.navigateBack('account-settings');
      this.appComponent.showFieldValidationAlert('Zmiana adresu email', 'Pomyślnie zmieniono adres email');
    }).catch(() => {
      this.appComponent.showFieldValidationAlert('Błąd','Nieprawidłowa wartość obecnego hasła');
    });
  }

  reauthenticateAndUpdateUserPassword(oldPassword: string, newPassword: string) {
    this.reauthenticateCurrentUser(oldPassword)
      .then(() => {
        firebase.auth().currentUser.updatePassword(newPassword);
        this.appComponent.showFieldValidationAlert('Zmiana hasła', 'Pomyślnie zmieniono hasło');
        this.navController.navigateBack('account-settings');

      }).catch(() => {
        this.appComponent.showFieldValidationAlert('Błąd','Nieprawidłowa wartość obecnego hasła');
      });   
  }

  async reauthenticateCurrentUser(oldPassword: string) {
    const currentUser = await firebase.auth().currentUser;
    const currentUserData = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, oldPassword)
    var authUserResult = await currentUser.reauthenticateWithCredential(currentUserData);
  }

  logOut() {
    this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user'); //nie wiem czy potrzebne
      this.navController.navigateBack('/sign-in'); //może navigate inne
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