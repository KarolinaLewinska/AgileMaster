import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { TeamsProjectsValidationService } from '../../../validation/teams-projects-validation-service';
import { AppComponent } from '../../../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TeamData } from '../../../model/team-data';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.page.html',
  styleUrls: ['./add-team.page.scss'],
})
export class AddTeamPage implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private angularFirestore: AngularFirestore,
    private teamsProjectsValidationService: TeamsProjectsValidationService) { }

  teamData = {} as TeamData;
  
  ngOnInit() {}

  async addTeam(teamData: TeamData) {
    if (this.teamsProjectsValidationService.checkIfTeamFieldsAreNotEmpty(this.teamData.name, this.teamData.projectName)) {
      
      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();
      
      try {
        var currentUser = firebase.auth().currentUser;
        await this.angularFirestore.collection('users').doc(currentUser.uid).collection('teams').add(teamData);
        
        this.appComponent.showAlertDialogWithOkButton('Dodano zespół', 'Pomyślnie dodano zespół');
        this.clearInputFields();
      } 
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby dodania zespołu');
      }
      this.appComponent.hideLoadingDialog();
    }
  }

  clearInputFields() {
    const emptyValue = null;
    this.teamData.name = emptyValue;
    this.teamData.projectName = emptyValue;
  }
}
