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
  
  allTasksNumber: any;

  analystsTasksNumber: any;
  developmentTeamTasksNumber: any;
  productOwnerTasksNumber: any;
  companyTasksNumber: any;
  educationTasksNumber: any;
  otherTasksNumber: any;

  lowPriorityTasksNumber: any;
  mediumPriorityTasksNumber: any;
  highPriorityTasksNumber: any;

  januaryTasksNumber: any;

  ngOnInit() {
    this.retrieveTasksNumberByPriority('Niski');
    this.retrieveTasksNumberByCategory('analysts')
    this.retrieveAllTasksNumber();
    this.retrieveTasksNumberByMonth('-01-');
  }

  async retrieveTasksNumberByCategory(category: string) { //działa ale trzbea jakoś zmneijszyc ilosc kodu
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks').doc('category').collection(category).get()
      .then((data) => {
      var amountOfTasks = data.size;
      this.analystsTasksNumber = amountOfTasks;
      });
  }

  async retrieveTasksNumberByPriority(priority: string) {  //działa, ale też jakby zmniejszyć duplikacje 
    let totalNumber = 0;
    let listOfCategories: string[] = ['analysts','developmentTeam', 'productOwner', 'company','education', 'otherTasks'];
    
    for (var i = 0; listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks').doc('category').collection(listOfCategories[i]).where('priority', '==', priority).get()
      .then((data) => {
      var numberOfTasks = data.size;
      totalNumber += numberOfTasks;
      this.lowPriorityTasksNumber = totalNumber; 
      });
    }
  }

  async retrieveAllTasksNumber() { //działa
    let totalNumber = 0;
    let listOfCategories: string[] = ['analysts','developmentTeam', 'productOwner', 'company','education', 'otherTasks'];

    for (var i = 0; listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks').doc('category').collection(listOfCategories[i]).get()
      .then((data) => {
      var numberOfTasks = data.size;
      totalNumber += numberOfTasks;
      this.allTasksNumber = totalNumber; 
      });
    }
  }

  async retrieveTasksNumberByMonth(month: string) {  //nie działa
    let totalNumber = 0;
    let listOfCategories: string[] = ['analysts','developmentTeam', 'productOwner', 'company','education', 'otherTasks'];
    
    for (var i = 0; listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks').doc('category').collection(listOfCategories[i]).where('dateOfFinish', 'array-contains-any', month).get()
      .then((data) => {
      var numberOfTasks = data.size;
      totalNumber += numberOfTasks;
      this.januaryTasksNumber = totalNumber; 
      });
    }
  }
}


