import { AppComponent } from '../app.component';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TasksValidationService {
    constructor(private appComponent: AppComponent) {}

    checkIfTasksFieldsAreNotEmpty(title: string, dateOfFinish: string, timeOfFinish: string,
        priority: string, category: string) {

        const headerTitle = 'Pole wymagane';

        if (!title) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Tytuł jest wymagany');
            return false;
        }
        if (!dateOfFinish) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Data jest wymagana');
            return false;
        }
        if (!timeOfFinish) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Godzina jest wymagana');
            return false;
        }
        if (!priority) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle,'Priorytet jest wymagany')
            return false;
        }
        if (!category) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle,'Kategoria jest wymagana');
            return false;
        }
        return true;
    }
}