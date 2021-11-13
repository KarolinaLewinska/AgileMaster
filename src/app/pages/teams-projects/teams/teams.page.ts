import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { AppComponent } from '../../../app.component';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private sharedService: SharedService) { }

  teamsData: any;
  currentUser = firebase.auth().currentUser;


  ngOnInit() {
    this.showTeamsList()
  }

  async showTeamsList() {
    this.appComponent.createLoadingDialog();
    this.appComponent.showLoadingDialog();

    try {
      var currentUser = firebase.auth().currentUser;
      this.angularFirestore.collection('users').doc(currentUser.uid)
        .collection('teams', teams => teams.orderBy('name')).snapshotChanges()
          .subscribe(teamsMapper => {
            this.teamsData = teamsMapper.map(mapper => {
              return {
                id: mapper.payload.doc.id,
                name: mapper.payload.doc.data()['name'],
                description: mapper.payload.doc.data()['description'],
                projectName: mapper.payload.doc.data()['projectName']
              }
            })
          });
    } 
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby wyświetlenia zespołów');
    }
    this.appComponent.hideLoadingDialog();
  }

  async deleteTeam(id) {
    var wantsToDelete = true;
    
    if (wantsToDelete) {
      const dialog = await this.appComponent.createAndShowAlertDialogWithConfirmAndCancelButton('Usuń zespół', 'Czy na pewno chcesz usunąć?');
      if (!dialog) {
        return;
      }
    }
    
    try {
      await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('teams').doc(id).delete();
      this.appComponent.showAlertDialogWithOkButton('Usunięto zespół', 'Pomyślnie usunięto zespół');
    } 
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby usunięcia zespołu');
    }
  }

  navigateToTeamDetails(teamDetails) {
    this.sharedService.navigateToTeamDetails(teamDetails);
  }
}
