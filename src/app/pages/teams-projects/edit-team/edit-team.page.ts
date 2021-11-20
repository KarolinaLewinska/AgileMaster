import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { TeamData } from '../../../model/team-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { TeamsProjectsValidationService } from '../../../validation/teams-projects-validation-service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.page.html',
  styleUrls: ['./edit-team.page.scss'],
})
export class EditTeamPage implements OnInit {
  teamData = {} as TeamData;
  id: any;
  currentUser = firebase.auth().currentUser;

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private  navController: NavController,
    private teamsProjectsValidationService: TeamsProjectsValidationService,
    private activatedRoute: ActivatedRoute) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }

  ngOnInit() {
    this.getTeamToEditData(this.id);
  }

  async getTeamToEditData(id: string) {

    this.angularFirestore.collection('users').doc(this.currentUser.uid)
      .collection('teams').doc(id).valueChanges()
        .subscribe(team => {
          this.teamData.name = team['name'];
          this.teamData.projectName = team['projectName'];
        });
  }

  async editTeam(teamData: TeamData) {
    if (this.teamsProjectsValidationService.checkIfTeamFieldsAreNotEmpty(this.teamData.name, this.teamData.projectName)) {
      try {
        await this.angularFirestore.collection('users').doc(this.currentUser.uid)
          .collection('teams').doc(this.id).update(teamData);

        this.appComponent.showAlertDialogWithOkButton('Edycja zespołu', 'Pomyślnie zaktualizowano zespół');
        this.navController.navigateBack('teams');
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby edycji zespołu');
      }
    }
  }
}
