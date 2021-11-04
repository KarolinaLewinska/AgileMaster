import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

@Injectable({
    providedIn: 'root',
  })

export class ValidationService {
    constructor(private appComponent: AppComponent) {}

    checkIfFieldsAreNotEmpty(emailInput: string, passwdInput: string) {
        const headerTitle = 'Pole wymagane';
        if (!emailInput) {
            this.appComponent.showFieldValidationAlert(headerTitle, 'Adres email jest wymagany');
            return false;
        }
        if (!passwdInput) {
            this.appComponent.showFieldValidationAlert(headerTitle,'Hasło jest wymagane');
            return false;
        }
        return true;
    }

    checkIfPasswordIsValidated(passwdInputValue, passwdConfirmInputValue) {
        const headerErrorMessage = 'Nieprawidłowe hasło';
        if (passwdInputValue.length < 6 ) {
          this.appComponent.showFieldValidationAlert(headerErrorMessage,'Hasło musi zawierać co najmniej 6 znaków');
          return false;
        }
        if (passwdInputValue.search(/.*?[0-9]/)) {
          this.appComponent.showFieldValidationAlert(headerErrorMessage,'Hasło musi zawierać co najmniej jedną cyfrę');
          return false;
        }
        if (passwdInputValue != passwdConfirmInputValue) {
          this.appComponent.showFieldValidationAlert('Różne hasła','Podane wartości haseł nie są takie same');
          return false;
        }
        return true;
    }
}