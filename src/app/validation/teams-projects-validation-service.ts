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

    checkIfMemberFieldsAreNotEmpty(nameAndSurname: string, organizationRole: string, teamName: string) {
        
        const headerTitle = 'Pole wymagane';

        if (!nameAndSurname) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Imię i nazwisko jest wymagane');
            return false;
        }
        if (!organizationRole) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Rola w organizacji jest wymagana');
            return false;
        }
        if (!teamName) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Nazwa zespołu jest wymagana');
            return false;
        }
        return true;
    }
}