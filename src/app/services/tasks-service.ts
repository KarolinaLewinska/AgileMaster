import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';

@Injectable({
    providedIn: 'root',
}
)
export class TasksService {
    constructor(
        private appComponent: AppComponent,
        private angularFirestore: AngularFirestore
    ) {}

    currentUser = firebase.auth().currentUser;
    
    async deleteTaskData(id: string, category: string) {
        this.appComponent.createLoadingDialog();
        this.appComponent.showLoadingDialog();
        
        try {
            await this.angularFirestore.collection('users').doc(this.currentUser.uid)
                .collection('tasks').doc('category').collection(category).doc(id).delete();
            this.appComponent.showAlertDialogWithOkButton('Usunięto zadanie', 'Pomyślnie usunięto zadanie');
        } catch(error) {
            this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby usunięcia zadania');
        }
       this.appComponent.hideLoadingDialog();
    }
}