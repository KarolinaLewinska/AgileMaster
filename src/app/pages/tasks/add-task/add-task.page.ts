import { Component, OnInit } from '@angular/core';
import { TasksValidationService } from '../../../validation/tasks-validation-service';
import { TaskData } from '../../../model/task-data';
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
    private angularFirestore: AngularFirestore) { }

  taskData = {} as TaskData;

  ngOnInit() {}

  async addTask(taskData: TaskData) {
    if (this.tasksValidationService.checkIfTasksFieldsAreNotEmpty(this.taskData.title, this.taskData.dateOfFinish,
      this.taskData.timeOfFinish, this.taskData.priority, this.taskData.category)) {

      try {
        var currentUser = firebase.auth().currentUser;
        await this.angularFirestore.collection('users').doc(currentUser.uid).collection('tasks')
          .doc('category').collection(this.setCategoryName()).add(taskData);

        this.appComponent.showAlertDialogWithOkButton('Dodano zadanie', 'Pomyślnie dodano zadanie');
        this.clearInputFields();
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby dodania zadania');
      }
    }
  }

  setCategoryName() {
    var nameOfCategory = "";
    switch (this.taskData.category) {
      case 'Analitycy':
        nameOfCategory = 'analysts';
        break;
      case 'Zespół deweloperski':
        nameOfCategory = 'developmentTeam';
        break;
      case 'Product Owner':
        nameOfCategory = 'productOwner';
        break;
      case 'Organizacja':
        nameOfCategory = 'company';
        break;
      case 'Edukacja':
        nameOfCategory = 'education';
        break;
      default:
        nameOfCategory = 'otherTasks';
        break;
    }
    return nameOfCategory;
  }

  clearInputFields() {
    const emptyValue = null;
    this.taskData.title = emptyValue;
    this.taskData.description = emptyValue;
    this.taskData.dateOfFinish = emptyValue;
    this.taskData.timeOfFinish = emptyValue;
    this.taskData.priority = emptyValue;
    this.taskData.category = emptyValue;
  }
}
