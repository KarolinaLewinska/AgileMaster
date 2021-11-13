import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { ProjectData } from '../../../model/project-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { TeamsProjectsValidationService } from '../../../validation/teams-projects-validation-service';
import { NavController } from '@ionic/angular';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.page.html',
  styleUrls: ['./edit-project.page.scss'],
})
export class EditProjectPage implements OnInit {
  projectData = {} as ProjectData;
  id: any;
  currentUser = firebase.auth().currentUser;

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private  navController: NavController,
    private sharedService: SharedService,
    private teamsProjectsValidationService: TeamsProjectsValidationService,
    private activatedRoute: ActivatedRoute) { 
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.getProjectToEditData(this.id);
  }

  async getProjectToEditData(id: string) {
    this.appComponent.createLoadingDialog();
    this.appComponent.showLoadingDialog();
    
    this.angularFirestore.collection('users').doc(this.currentUser.uid)
      .collection('projects').doc(id).valueChanges()
      .subscribe(project => {
        this.projectData.name = project['name'];
        this.projectData.description = project['description'];
        this.projectData.dateOfStart = project['dateOfStart'];
        this.projectData.dateOfFinish = project['dateOfFinish'];
        this.projectData.teamName = project['teamName']; 
      });
    this.appComponent.hideLoadingDialog();
  }

  async editProjectData(projectData: ProjectData) {
    if (this.teamsProjectsValidationService.checkIfProjectFieldsAreNotEmpty(this.projectData.name, 
      this.projectData.dateOfStart, this.projectData.dateOfFinish, this.projectData.teamName)) {
        
      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();
      
      try {
        await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('projects')
            .doc(this.id).update(projectData);
        this.appComponent.showAlertDialogWithOkButton('Edycja projektu', 'Zaktualizowano projekt');
        this.navController.navigateBack('projects');
      } 
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby edycji projektu');
      }
      this.appComponent.hideLoadingDialog();
    }
  }
}
