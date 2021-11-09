import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';

@Injectable({
    providedIn: 'root',
})
export class EventsValidationService {
    constructor(private appComponent: AppComponent) {}

    checkIfEventsFieldsAreNotEmpty(name: string, date: string, startTime: string, 
        duration: string, place: string, category: string) {
        
        const headerTitle = 'Pole wymagane';

        if (!name) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Nazwa jest wymagana');
            return false;
        }
        if (!date) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Data jest wymagana');
            return false;
        }
        if (!startTime) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle, 'Godzina rozpoczęcia jest wymagana');
            return false;
        }
        if (!duration) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle,'Czas trwania jest wymagany')
            return false;
        }
        if (!place) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle,'Miejsce spotkania jest wymagane')
            return false;
        }
        if (!category) {
            this.appComponent.showAlertDialogWithOkButton(headerTitle,'Kategoria jest wymagana');
            return false;
        }
        return true;
    }
}