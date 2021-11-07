import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { TaskData } from '../../../model/task-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { TasksValidationService } from '../../../validation/tasks-validation-service';
import { NavController } from '@ionic/angular';

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
    private  navController: NavController,
    private tasksValidationService: TasksValidationService,
    private activatedRoute: ActivatedRoute) { 
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.category = this.activatedRoute.snapshot.paramMap.get('category');
    }

  ngOnInit() {
    this.getTaskToEditData(this.id, this.category);
  }

  async getTaskToEditData(id: string, category: string) {
    this.appComponent.createLoadingDialog();
    this.appComponent.showLoadingDialog();
    
    this.angularFirestore.collection('users').doc(this.currentUser.uid)
      .collection('tasks').doc('category').collection(category).doc(id).valueChanges()
      .subscribe(task => {
        this.taskData.title = task['title'];
        this.taskData.description = task['description'];
        this.taskData.dateOfFinish = task['dateOfFinish'];
        this.taskData.timeOfFinish = task['timeOfFinish'];
        this.taskData.priority = task['priority']; 
        this.taskData.category = task['category'];
      });
    this.appComponent.hideLoadingDialog();
  }

  async editTaskData(taskData: TaskData) {
    if (this.tasksValidationService.checkIfTasksFieldsAreNotEmpty(this.taskData.title, this.taskData.description, 
      this.taskData.dateOfFinish, this.taskData.timeOfFinish, this.taskData.priority, this.taskData.category)) {
        
      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();
      
      try {
        if (this.taskData.category == this.category) {
          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('tasks')
            .doc('category').collection(this.category).doc(this.id).update(taskData);
        } else {
          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('tasks')
            .doc('category').collection(this.category).doc(this.id).delete();

          await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('tasks')
            .doc('category').collection(this.taskData.category).add(taskData);
        }
        this.appComponent.showAlertDialogWithOkButton('Edycja zadania', 'Pomyślnie zaktualizowano zadanie');
        this.navController.navigateBack('tasks-categories');
      } 
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby edycji zadania');
      }
      this.appComponent.hideLoadingDialog();
    }
  }
}
