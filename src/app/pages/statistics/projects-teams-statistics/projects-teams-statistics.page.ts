import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AppComponent } from '../../../app.component';

@Component({
  selector: 'app-projects-teams-statistics',
  templateUrl: './projects-teams-statistics.page.html',
  styleUrls: ['./projects-teams-statistics.page.scss'],
})
export class ProjectsTeamsStatisticsPage implements OnInit {
  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent) { }

  allProjectsNumber: any;
  allTeamsNumber: any;
  allMembersNumber: any;
  currentUser = firebase.auth().currentUser;

  headerErrorMessage = 'Błąd danych'
  errorMessage = 'Wystąpił błąd podczas próby pobrania danych';

  ngOnInit() {
    this.retrieveAllProjectsNumber();
    this.retrieveAllTeamsNumber();
    this.retrieveAllMembersNumber();
  }

  async retrieveAllProjectsNumber() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('projects').get()
      .then(data => {
      var numberOfProjects = data.size;
      this.allProjectsNumber = numberOfProjects;
      }).catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }

  async retrieveAllTeamsNumber() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('teams').get()
      .then(data => {
      var numberOfTeams = data.size;
      this.allTeamsNumber = numberOfTeams;
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }

  async retrieveAllMembersNumber() {
    firebase.firestore().collection('users').doc(this.currentUser.uid).collection('members').get()
      .then(data => {
      var numberOfMembers = data.size;
      this.allMembersNumber = numberOfMembers;
      })
      .catch(() => {
        this.appComponent.showAlertDialogWithOkButton(this.headerErrorMessage, this.errorMessage);
      });
  }
}
