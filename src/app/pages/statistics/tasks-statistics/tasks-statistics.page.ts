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
  listOfCategories: string[] = ['analysts','developmentTeam', 'productOwner', 'company','education', 'otherTasks'];

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

  ngOnInit() {
    this.retrieveAllTasksNumber();
    this.retrieveTasksNumberByAnalystsCategory();
    this.retrieveTasksNumberByDevelopmentTeamCategory();
    this.retrieveTasksNumberByProductOwnerCategory();
    this.retrieveTasksNumberByCompanyCategory();
    this.retrieveTasksNumberByEducationCategory();
    this.retrieveOtherTasksNumberByCategory();
    this.retrieveTasksNumberByHighPriority();
    this.retrieveTasksNumberByMediumPriority();
    this.retrieveTasksNumberByLowPriority();
  }

  async retrieveAllTasksNumber() {
    let totalNumber = 0;
    for (var i = 0; this.listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.listOfCategories[i]).get()
        .then(data => {
          var numberOfTasks = data.size;
          totalNumber += numberOfTasks;
          this.allTasksNumber = totalNumber;
      });
    }
  }

  async retrieveTasksNumberByAnalystsCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('analysts').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.analystsTasksNumber = numberOfTasks;
    });
  }

  async retrieveTasksNumberByDevelopmentTeamCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('developmentTeam').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.developmentTeamTasksNumber = numberOfTasks;
    });
  }

  async retrieveTasksNumberByProductOwnerCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('productOwner').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.productOwnerTasksNumber = numberOfTasks;
    });
  }

  async retrieveTasksNumberByCompanyCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('company').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.companyTasksNumber = numberOfTasks;
    });
  }

  async retrieveTasksNumberByEducationCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('education').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.educationTasksNumber = numberOfTasks;
    });
  }

  async retrieveOtherTasksNumberByCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('otherTasks').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.otherTasksNumber = numberOfTasks;
    });
  }

  async retrieveTasksNumberByHighPriority() {
    let totalNumber = 0;
    for (var i = 0; this.listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.listOfCategories[i]).where('priority', '==', 'wysoki').get()
        .then(data => {
          var numberOfTasks = data.size;
          totalNumber += numberOfTasks;
          this.highPriorityTasksNumber = totalNumber;
      });
    }
  }

  async retrieveTasksNumberByMediumPriority() {
    let totalNumber = 0;
    for (var i = 0; this.listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.listOfCategories[i]).where('priority', '==', 'średni').get()
        .then(data => {
          var numberOfTasks = data.size;
          totalNumber += numberOfTasks;
          this.mediumPriorityTasksNumber = totalNumber;
      });
    }
  }

  async retrieveTasksNumberByLowPriority() {
    let totalNumber = 0;
    for (var i = 0; this.listOfCategories.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.listOfCategories[i]).where('priority', '==', 'niski').get()
        .then(data => {
          var numberOfTasks = data.size;
          totalNumber += numberOfTasks;
          this.lowPriorityTasksNumber = totalNumber;
      });
    }
  }
}


