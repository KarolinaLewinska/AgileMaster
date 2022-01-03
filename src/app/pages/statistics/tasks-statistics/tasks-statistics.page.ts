import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-tasks-statistics',
  templateUrl: './tasks-statistics.page.html',
  styleUrls: ['./tasks-statistics.page.scss'],
})

export class TasksStatisticsPage implements OnInit {
  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent) { }

  currentUser = firebase.auth().currentUser;
  categoriesList: string[] = ['analysts','developmentTeam', 'productOwner', 'company','education', 'otherTasks'];

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

  headerErrorMessage = 'Błąd danych'
  errorMessage = 'Wystąpił błąd podczas próby pobrania danych';

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
    for (var i = 0; this.categoriesList.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.categoriesList[i]).get()
        .then(data => {
          var numberOfTasks = data.size;
          totalNumber += numberOfTasks;
          this.allTasksNumber = totalNumber;
        })
        .catch(() => {
          this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
        });
    }
  }

  async retrieveTasksNumberByAnalystsCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('analysts').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.analystsTasksNumber = numberOfTasks;
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }

  async retrieveTasksNumberByDevelopmentTeamCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('developmentTeam').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.developmentTeamTasksNumber = numberOfTasks;
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }

  async retrieveTasksNumberByProductOwnerCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('productOwner').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.productOwnerTasksNumber = numberOfTasks;
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }

  async retrieveTasksNumberByCompanyCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('company').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.companyTasksNumber = numberOfTasks;
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }

  async retrieveTasksNumberByEducationCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('education').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.educationTasksNumber = numberOfTasks;
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }

  async retrieveOtherTasksNumberByCategory() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
      .doc('category').collection('otherTasks').get()
      .then(data => {
        var numberOfTasks = data.size;
        this.otherTasksNumber = numberOfTasks;
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }

  async retrieveTasksNumberByHighPriority() {
    let totalNumber = 0;
    for (var i = 0; this.categoriesList.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.categoriesList[i]).where('priority', '==', 'wysoki').get()
        .then(data => {
          var numberOfTasks = data.size;
          totalNumber += numberOfTasks;
          this.highPriorityTasksNumber = totalNumber;
        })
        .catch(() => {
          this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
        });
    }
  }

  async retrieveTasksNumberByMediumPriority() {
    let totalNumber = 0;
    for (var i = 0; this.categoriesList.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.categoriesList[i]).where('priority', '==', 'średni').get()
        .then(data => {
          var numberOfTasks = data.size;
          totalNumber += numberOfTasks;
          this.mediumPriorityTasksNumber = totalNumber;
        })
        .catch(() => {
          this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
        });
    }
  }

  async retrieveTasksNumberByLowPriority() {
    let totalNumber = 0;
    for (var i = 0; this.categoriesList.length; i++) {
      firebase.firestore().collection('users').doc(this.currentUser.uid).collection('tasks')
        .doc('category').collection(this.categoriesList[i]).where('priority', '==', 'niski').get()
        .then(data => {
          var numberOfTasks = data.size;
          totalNumber += numberOfTasks;
          this.lowPriorityTasksNumber = totalNumber;
        })
        .catch(() => {
          this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
        });
    }
  }
}


