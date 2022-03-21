import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import { AppComponent } from '../app.component';
import { deleteUser } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticationService {
  private dataOfUser: any;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private navController: NavController,
    private appComponent: AppComponent) {
      this.angularFireAuth.authState.subscribe(user => {
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

  signInWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
      .then(auth => {
        if (auth.user.emailVerified) {
          this.navController.navigateForward('tasks-categories');
        } else {
          this.appComponent.showAlertDialogWithOkButton('Potwierdź rejestrację','Aby móc się zalogować potwierdź rejestrację');
        }
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton('Błąd','Wystąpił błąd podczas próby zalogowania się');
      });
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  sendEmailToConfirmSignUp() {
    firebase.auth().currentUser.sendEmailVerification()
      .then(() => {
        this.navController.navigateBack('sign-up-confirm');
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton('Błąd','Wystąpił błąd podczas próby wysłania wiadomości potwierdzającej rejestrację');
      });
  }

  sendEmailToResetPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

  reauthenticateAndUpdateUserEmail(password: string, newEmail: string) {
    this.reauthenticateCurrentUser(password)
      .then(() => {
        firebase.auth().currentUser.updateEmail(newEmail);
        this.navController.navigateBack('account-settings');
        this.appComponent.showAlertDialogWithOkButton('Zmiana adresu email', 'Pomyślnie zmieniono adres email');
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton('Błąd','Nieprawidłowa wartość bieżącego hasła');
      });
  }

  reauthenticateAndUpdateUserPassword(oldPassword: string, newPassword: string) {
    this.reauthenticateCurrentUser(oldPassword)
      .then(() => {
        firebase.auth().currentUser.updatePassword(newPassword);
        this.appComponent.showAlertDialogWithOkButton('Zmiana hasła', 'Pomyślnie zmieniono hasło');
        this.navController.navigateBack('account-settings');
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton('Błąd','Nieprawidłowa wartość bieżącego hasła');
      });
  }

  async reauthenticateCurrentUser(oldPassword: string) {
    const currentUser = await firebase.auth().currentUser;
    const currentUserData = firebase.auth.EmailAuthProvider.credential(firebase.auth().currentUser.email, oldPassword);
    var authUserResult = await currentUser.reauthenticateWithCredential(currentUserData);
  }

  logOut() {
    this.angularFireAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.navController.navigateBack('sign-in');
      });
  }

  reauthenticateAndDeleteUserAccount(oldPassword: string) {
    this.reauthenticateCurrentUser(oldPassword)
      .then(() => {
        deleteUser(firebase.auth().currentUser);
        this.appComponent.showAlertDialogWithOkButton('Usunięto konto', 'Konto zostało usunięte');
        this.navController.navigateBack('home');
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton('Błąd','Nieprawidłowa wartość bieżącego hasła');
      });
  }
}