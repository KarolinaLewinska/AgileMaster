import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import firebase from 'firebase/compat/app';

@Injectable({
    providedIn: 'root',
  })

export class ValidationService {
  constructor(private appComponent: AppComponent) {}

  checkIfAuthFieldsAreNotEmpty(emailInput: string, passwdInput: string) {
    const headerTitle = 'Pole wymagane';
        
    if (!emailInput) {
      this.appComponent.showFieldValidationAlert(headerTitle, 'Adres email jest wymagany');
      return false;
    }
    if (!passwdInput) {
      this.appComponent.showFieldValidationAlert(headerTitle, 'Hasło jest wymagane');
      return false;
    }
    return true;
  }

  checkIfPasswdFieldsAreNotEmpty(oldPasswd: string, newPasswd: string, newPasswdConfirm: string) {
    if (!oldPasswd || !newPasswd || !newPasswdConfirm) {
      this.appComponent.showFieldValidationAlert('Pola wymagane', 'Wypełnij wszystkie pola');
      return false;
    }
    return true;
  }

  checkIfPasswordIsValidated(passwdInputValue: string, passwdConfirmInputValue: string) {
    const headerErrorMessage = 'Nieprawidłowe hasło';
      
    if (passwdInputValue.length < 6 ) {
      this.appComponent.showFieldValidationAlert(headerErrorMessage, 'Hasło musi zawierać co najmniej 6 znaków');
      return false;
    }
    if (passwdInputValue.search(/.*?[0-9]/)) {
      this.appComponent.showFieldValidationAlert(headerErrorMessage, 'Hasło musi zawierać co najmniej jedną cyfrę');
      return false;
    }
    if (passwdInputValue != passwdConfirmInputValue) {
      this.appComponent.showFieldValidationAlert('Różne hasła', 'Podane wartości haseł nie są takie same');
      return false;
    }
    return true;
  }

  checkIfEmailIsValidated(emailFromInput: string) {
    var currentUserEmail = firebase.auth().currentUser.email;
    if (!emailFromInput) {
      this.appComponent.showFieldValidationAlert('Pole wymagane', 'Wprowadź adres email');
      return false;
    }
    if (emailFromInput == currentUserEmail) {
      this.appComponent.showFieldValidationAlert('Błąd uwierzytelniania', 'Podany adres email jest obecnie przypisany do konta');
      return false;
    }
    if (!emailFromInput.match('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')) {
      this.appComponent.showFieldValidationAlert('Błąd uwierzytelniania', 'Nieprawidłowy format adresu email');
      return false;
    }
    return true;
  }
}