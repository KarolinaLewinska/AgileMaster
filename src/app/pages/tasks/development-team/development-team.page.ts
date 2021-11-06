import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { UserData } from '../../../model/user-data';
import { AppComponent } from '../../../app.component';
@Component({
  selector: 'app-development-team',
  templateUrl: './development-team.page.html',
  styleUrls: ['./development-team.page.scss'],
})
export class DevelopmentTeamPage implements OnInit {

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent
  ) { }

  tasksData: any;
  user = {
    email: firebase.auth().currentUser.email,
  } as UserData;

  ngOnInit() {
    this.showTasksList()
  }

  async showTasksList() {
    const nameOfTasksCategory = 'Zespół deweloperski';
    this.appComponent.createLoadingDialog();
    this.appComponent.showLoadingDialog();

    try {
      var currentUser = firebase.auth().currentUser;
      this.angularFirestore.collection('users').doc(currentUser.uid).collection('tasks').doc('category')
        .collection(nameOfTasksCategory, tasks => tasks.orderBy('dateOfFinish')).snapshotChanges()
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
    } catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby wyświetlenia zadań');
    }
    this.appComponent.hideLoadingDialog();
  }
}
