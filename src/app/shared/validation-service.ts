import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root',
  })

export class ValidationService {
  constructor(private appComponent: AppComponent) {}

  checkIfAuthFieldsAreNotEmpty(emailValue: string, passwdValue: string) {
    const headerTitle = 'Pole wymagane';
        
    if (!emailValue) {
      this.appComponent.showFieldValidationAlert(headerTitle, 'Adres email jest wymagany');
      return false;
    }
    if (!passwdValue) {
      this.appComponent.showFieldValidationAlert(headerTitle, 'Hasło jest wymagane');
      return false;
    }
    return true;
  }

  checkIfPasswdFieldsAreNotEmpty(oldPasswdValue: string, newPasswdValue: string, newPasswdConfirmValue: string) {
    if (!oldPasswdValue || !newPasswdValue || !newPasswdConfirmValue) {
      this.appComponent.showFieldValidationAlert('Pola wymagane', 'Wypełnij wszystkie pola');
      return false;
    }
    return true;
  }

  checkIfPasswordIsValid(passwdValue: string, confirmPasswdValue: string) {
    const headerErrorMessage = 'Nieprawidłowe hasło';
      
    if (passwdValue.length < 6 ) {
      this.appComponent.showFieldValidationAlert(headerErrorMessage, 'Hasło musi zawierać co najmniej 6 znaków');
      return false;
    }
    if (passwdValue.search(/.*?[0-9]/)) {
      this.appComponent.showFieldValidationAlert(headerErrorMessage, 'Hasło musi zawierać co najmniej jedną cyfrę');
      return false;
    }
    if (passwdValue != confirmPasswdValue) {
      this.appComponent.showFieldValidationAlert('Różne hasła', 'Podane wartości haseł nie są takie same');
      return false;
    }
    return true;
  }

  checkIfEmailIsValid(emailValue: string) {
    var currentUserEmail = firebase.auth().currentUser.email;
    if (!emailValue) {
      this.appComponent.showFieldValidationAlert('Pole wymagane', 'Wprowadź adres email');
      return false;
    }
    if (emailValue == currentUserEmail) {
      this.appComponent.showFieldValidationAlert('Błąd uwierzytelniania', 'Podany adres email jest obecnie przypisany do konta');
      return false;
    }
    if (!emailValue.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')) {
      this.appComponent.showFieldValidationAlert('Błąd uwierzytelniania', 'Nieprawidłowy format adresu email');
      return false;
    }
    return true;
  }
}