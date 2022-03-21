import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { MemberData } from '../../../model/member-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../../app.component';
import { TeamsProjectsValidationService } from '../../../validation/teams-projects-validation-service';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.page.html',
  styleUrls: ['./edit-member.page.scss'],
})
export class EditMemberPage implements OnInit {
  memberData = {} as MemberData;
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
    this.getMemberToEditData(this.id);
  }

  async getMemberToEditData(id: string) {
    this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('members').doc(id)
      .valueChanges().subscribe(member => {
        this.memberData.nameAndSurname = member['nameAndSurname'];
        this.memberData.organizationRole = member['organizationRole'];
        this.memberData.email = member['email'];
        this.memberData.phone = member['phone'];
        this.memberData.room = member['room'];
        this.memberData.teamName = member['teamName'];
      });
  }

  async editMember(memberData: MemberData) {
    if (this.teamsProjectsValidationService.checkIfMemberFieldsAreNotEmpty(this.memberData.nameAndSurname,
      this.memberData.organizationRole, this.memberData.email, this.memberData.phone, this.memberData.room, this.memberData.teamName)
        && this.teamsProjectsValidationService.checkIfEmailAndPhoneAreValid(this.memberData.email, this.memberData.phone)) {

      try {
        await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('members').doc(this.id).update(memberData);
        this.appComponent.showAlertDialogWithOkButton('Edycja członka zespołu', 'Pomyślnie zaktualizowano dane członka zespołu');
        this.navController.navigateBack('members');
      } catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby edycji danych członka zespołu');
      }
    }
  }
}
