import { AppComponent } from '../app.component';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TeamsProjectsValidationService {
    constructor(private appComponent: AppComponent) {}
    
    checkIfTeamFieldsAreNotEmpty(name: string, projectName: string) {
        
        const headerTitle = 'Pole wymagane';

        if (!name) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Nazwa jest wymagana');
            return false;
        }
        if (!projectName) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Nazwa projektu wymagana');
            return false;
        }
        return true;
    }

    checkIfProjectFieldsAreNotEmpty(name: string, dateOfStart: string, dateOfFisnish: string,
        teamName: string) {
        
        const headerTitle = 'Pole wymagane';

        if (!name) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Nazwa jest wymagana');
            return false;
        }
        if (!dateOfStart) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Data rozpoczęcia jest wymagana');
            return false;
        }
        if (!dateOfFisnish) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Data zakończenia jest wymagana');
            return false;
        }
        if (!teamName) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Nazwa zespołu jest wymagana');
            return false;
        }
        return true;
    }

    checkIfMemberFieldsAreNotEmpty(nameAndSurname: string, organizationRole: string, email: string, phone: string, room: string, teamName: string) {
        
        const headerTitle = 'Pole wymagane';

        if (!nameAndSurname) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Imię i nazwisko jest wymagane');
            return false;
        }
        if (!organizationRole) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Rola w organizacji jest wymagana');
            return false;
        }
        if (!email) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Adres email jest wymagany');
            return false;
        }
        if (!phone) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Numer telefonu jest wymagany');
            return false;
        }
        if (!room) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Numer pokoju jest wymagany');
            return false;
        }
        if (!teamName) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Nazwa zespołu jest wymagana');
            return false;
        }
        return true;
    }

    checkIfEmailAndPhoneIsValid(email: string, phone: string) {
        if (email != null && !email.match('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')) {
            this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Nieprawidłowy format adresu email');
            return false;
        }
        if (phone != null && !phone.match('^[0-9-+() ]+$')) {
            this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Nieprawidłowy format numeru telefonu');
            return false; 
        }
        return true;
    }
}