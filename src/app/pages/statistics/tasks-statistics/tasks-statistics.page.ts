import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tasks-statistics',
  templateUrl: './tasks-statistics.page.html',
  styleUrls: ['./tasks-statistics.page.scss'],
})
export class TasksStatisticsPage implements OnInit {
  constructor(private angularFirestore: AngularFirestore) { }

  currentUser = firebase.auth().currentUser;
  analystsTasksNumber: any
  developmentTeamTasksNumber: any

  ngOnInit() {
    this.retrieveTasksNumberByPriority();
  }

  // async retrieveTasksNumberByCategory(category: string) { //działa ale trzbea jakoś zmneijszyc ilosc kodu
  //   firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks').doc('category').collection(category).get()
  //     .then((query) => {
  //     var amountOfTasks = query.size;
  //     this.analystsTasksNumber = amountOfTasks;
  //     });
  // }

  async retrieveTasksNumberByPriority() { //działa ale trzbea jakoś zmneijszyc ilosc kodu
    let listOfCategories: string[] = ['analysts', 'courses','education', 'otherTasks', 'developmentTeam', , 'productOwner']
    for(var i = 0; listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks').doc('category').collection(listOfCategories[i]).where('priority', '==', 'Średni').get()
      .then((query) => {
      var amountOfTasks = query.size;
      let result: number  = 0;
      result = result + amountOfTasks
      this.analystsTasksNumber = result; //coś źle 
      });
    }
  }
}
