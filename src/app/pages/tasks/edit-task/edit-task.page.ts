import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { TaskData } from '../../../model/task-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { TasksValidationService } from '../../../validation/tasks-validation-service';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
})
export class EditTaskPage implements OnInit {
  taskData = {} as TaskData;
  id: any;
  category: any;
  currentUser = firebase.auth().currentUser;

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private sharedService: SharedService,
    private tasksValidationService: TasksValidationService,
    private activatedRoute: ActivatedRoute) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.category = this.activatedRoute.snapshot.paramMap.get('category');
    }

  ngOnInit() {
    this.getTaskToEditData(this.id);
  }

  async getTaskToEditData(id: string) {
    
    

    this.angularFirestore.collection('users').doc(this.currentUser.uid)
      .collection('tasks').doc('category').collection( this.sharedService.setTaskCategoryName(this.category))
      .doc(id).valueChanges()
      .subscribe(task => {
        this.taskData.title = task['title'];
        this.taskData.description = task['description'];
        this.taskData.dateOfFinish = task['dateOfFinish'];
        this.taskData.timeOfFinish = task['timeOfFinish'];
        this.taskData.priority = task['priority'];
        this.taskData.category = task['category'];
      });
    
  }

  async editTask(taskData: TaskData) {
    if (this.tasksValidationService.checkIfTasksFieldsAreNotEmpty(this.taskData.title, this.taskData.dateOfFinish, 
      this.taskData.timeOfFinish, this.taskData.priority, this.taskData.category)) {

      
      

      try {
        if (this.category == this.taskData.category) {
          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('tasks')
            .doc('category').collection(this.sharedService.setTaskCategoryName(this.category)).doc(this.id).update(taskData);
        } else {
          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('tasks')
            .doc('category').collection(this.sharedService.setTaskCategoryName(this.taskData.category)).add(taskData);

          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('tasks')
            .doc('category').collection(this.sharedService.setTaskCategoryName(this.category)).doc(this.id).delete();

        }
        this.appComponent.showAlertDialogWithOkButton('Edycja zadania', 'Zaktualizowano zadanie');
        this.sharedService.navigateBackToTasksList(this.taskData.category);
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby edycji zadania');
      }
      
    }
  }

  navigateBackFromDetailsToList() {
    this.sharedService.navigateBackToTasksList(this.category.valueOf())
  }
}
