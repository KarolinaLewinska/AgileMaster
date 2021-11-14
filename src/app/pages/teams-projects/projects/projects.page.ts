import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { AppComponent } from '../../../app.component';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private sharedService: SharedService) { }

  projectsData: any;
  currentUser = firebase.auth().currentUser;

  ngOnInit() {
    this.showProjectsList();
  }

  async showProjectsList() {
    this.appComponent.createLoadingDialog();
    this.appComponent.showLoadingDialog();

    try {
      var currentUser = firebase.auth().currentUser;
      this.angularFirestore.collection('users').doc(currentUser.uid)
        .collection('projects', projects => projects.orderBy('dateOfFinish')).snapshotChanges()
          .subscribe(projectsMapper => {
            this.projectsData = projectsMapper.map(mapper => {
              return {
                id: mapper.payload.doc.id,
                name: mapper.payload.doc.data()['name'],
                description: mapper.payload.doc.data()['description'],
                dateOfStart: mapper.payload.doc.data()['dateOfStart'].split('T')[0],
                dateOfFinish: mapper.payload.doc.data()['dateOfFinish'].split('T')[0],
                teamName: mapper.payload.doc.data()['teamName'],
              }
            })
          });
    } 
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby wyświetlenia projektów');
    }
    this.appComponent.hideLoadingDialog();
  }

  async deleteProject(id) {
    var wantsToDelete = true;
    
    if (wantsToDelete) {
      const dialog = await this.appComponent.createAndShowAlertDialogWithConfirmAndCancelButton('Usuń projekt', 'Czy na pewno chcesz usunąć?');
      if (!dialog) {
        return;
      }
    }
    
    try {
      await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('projects').doc(id).delete();
      this.appComponent.showAlertDialogWithOkButton('Usunięto projekt', 'Pomyślnie usunięto projekt');
    } 
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby usunięcia projektu');
    }
  }

  navigateToProjectDetails(projectDetails) {
    this.sharedService.navigateToProjectDetails(projectDetails);
  }

}
