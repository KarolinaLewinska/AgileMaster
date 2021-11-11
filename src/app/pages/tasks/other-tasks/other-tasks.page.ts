import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { AppComponent } from '../../../app.component';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-other-tasks',
  templateUrl: './other-tasks.page.html',
  styleUrls: ['./other-tasks.page.scss'],
})
export class OtherTasksPage implements OnInit {
  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private sharedService: SharedService
  ) { }

  tasksData: any;
  currentUser = firebase.auth().currentUser;
  nameOfTasksCategory = 'otherTasks';

  ngOnInit() {
    this.showTasksList()
  }

  async showTasksList() {
    this.appComponent.createLoadingDialog();
    this.appComponent.showLoadingDialog();

    try {
      var currentUser = firebase.auth().currentUser;
      this.angularFirestore.collection('users').doc(currentUser.uid).collection('tasks').doc('category')
        .collection(this.nameOfTasksCategory, tasks => tasks.orderBy('dateOfFinish')).snapshotChanges()
          .subscribe(tasksMapper => {
            this.tasksData = tasksMapper.map(mapper => {
              return {
                id: mapper.payload.doc.id,
                title: mapper.payload.doc.data()['title'],
                description: mapper.payload.doc.data()['description'],
                dateOfFinish: mapper.payload.doc.data()['dateOfFinish'].split('T')[0],
                timeOfFinish: mapper.payload.doc.data()['timeOfFinish'].split('T')[1].substring(0, 5),
                priority: mapper.payload.doc.data()['priority'],
                category: mapper.payload.doc.data()['category']
              }
            })
          });
    } 
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby wyświetlenia zadań');
    }
    this.appComponent.hideLoadingDialog();
  }

  async deleteTask(id) {
    var wantsToDelete = true;
    
    if (wantsToDelete) {
      const dialog = await this.appComponent.createAndShowAlertDialogWithConfirmAndCancelButton('Usuń zadanie', 'Czy na pewno chcesz usunąć?');
      if (!dialog) {
        return;
      }
    }
    
    try {
      await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.nameOfTasksCategory).doc(id).delete();
      this.appComponent.showAlertDialogWithOkButton('Usunięto zadanie', 'Pomyślnie usunięto zadanie');
    } 
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby usunięcia zadania');
    }
  }

  navigateToTaskDetails(taskDetails) {
    this.sharedService.navigateToTaskDetails(taskDetails);
}
}
