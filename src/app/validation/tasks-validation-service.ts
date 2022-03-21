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
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Tytuł zadania jest wymagany');
            return false;
        }
        if (!dateOfFinish) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Data wykonania zadania jest wymagana');
            return false;
        }
        if (!timeOfFinish) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Godzina wykonania zadania jest wymagana');
            return false;
        }
        if (!priority) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle,'Priorytet zadania jest wymagany');
            return false;
        }
        if (!category) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle,'Kategoria zadania jest wymagana');
            return false;
        }
        return true;
    }
}