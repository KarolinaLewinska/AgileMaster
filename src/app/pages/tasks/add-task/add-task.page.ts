import { Component, OnInit } from '@angular/core';
import { TasksValidationService } from '../../../validation/tasks-validation-service';
import { TaskData } from '../../../model/task-data';
import { UserData } from '../../../model/user-data';
import firebase from '@firebase/app-compat';
import { AppComponent } from '../../../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})

export class AddTaskPage implements OnInit {
  constructor(
    private tasksValidationService: TasksValidationService,
    private appComponent: AppComponent,
    private angularFirestore: AngularFirestore
  ) { }

  taskData = {} as TaskData;
  userData = {
    email: firebase.auth().currentUser.email,
  } as UserData;
  
  ngOnInit() {
  }

  async addTask(taskData: TaskData) {
    if (this.tasksValidationService.checkIfTasksFieldsAreNotEmpty(this.taskData.title, this.taskData.description, 
      this.taskData.dateOfFinish, this.taskData.timeOfFinish, this.taskData.priority, this.taskData.category)) {
      
      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();

      try {
        var currentUser = firebase.auth().currentUser;
        this.angularFirestore.collection('users').doc(currentUser.uid).collection('tasks').doc('category').collection(this.taskData.category).add(taskData);
        this.appComponent.showAlertDialogWithOkButton("Dodano zadanie", "Pomyślnie dodano zadanie")
      } catch(error) {
        this.appComponent.showAlertDialogWithOkButton("Błąd uwierzytelniania", "Wystąpił błąd podczas próby dodania")
      }
      this.appComponent.hideLoadingDialog();
    }
  }
}
