import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { TeamsProjectsValidationService } from '../../../validation/teams-projects-validation-service';
import { AppComponent } from '../../../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProjectData } from '../../../model/project-data';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.page.html',
  styleUrls: ['./add-project.page.scss'],
})
export class AddProjectPage implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private angularFirestore: AngularFirestore,
    private teamsProjectsValidationService: TeamsProjectsValidationService
  ) { }

  projectData = {} as ProjectData;


  ngOnInit() {}

  async addProject(projectData: ProjectData) {
    if (this.teamsProjectsValidationService.checkIfProjectFieldsAreNotEmpty(this.projectData.name,
      this.projectData.dateOfStart, this.projectData.dateOfFinish, this.projectData.teamName)) {

      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();

      try {
        var currentUser = firebase.auth().currentUser;
        await this.angularFirestore.collection('users').doc(currentUser.uid).collection('projects').add(projectData);

        this.appComponent.showAlertDialogWithOkButton('Dodano projekt', 'Pomyślnie dodano projekt');
        this.clearInputFields();
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby dodania projektu');
      }
      this.appComponent.hideLoadingDialog();
    }
  }

  clearInputFields() {
    const emptyValue = null;
    this.projectData.name = emptyValue;
    this.projectData.description = emptyValue;
    this.projectData.dateOfStart = emptyValue;
    this.projectData.dateOfFinish = emptyValue;
    this.projectData.teamName = emptyValue;
  }
}
