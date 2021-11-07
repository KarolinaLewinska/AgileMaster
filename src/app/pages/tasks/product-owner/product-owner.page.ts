import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { AppComponent } from '../../../app.component';
import { TasksService } from '../../../services/tasks-service';

@Component({
  selector: 'app-product-owner',
  templateUrl: './product-owner.page.html',
  styleUrls: ['./product-owner.page.scss'],
})
export class ProductOwnerPage implements OnInit {
  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private tasksService: TasksService
  ) { }

  tasksData: any;
  nameOfTasksCategory = 'Product Owner';
 
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
    this.tasksService.deleteTaskData(id, this.nameOfTasksCategory);
  }

  navigateToTaskDetails(taskDetails) {
    this.tasksService.navigateToDetails(taskDetails);
  }
}
