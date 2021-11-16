import { Component, OnInit } from '@angular/core';
import firebase from '@firebase/app-compat';
import { TeamsProjectsValidationService } from '../../../validation/teams-projects-validation-service';
import { AppComponent } from '../../../app.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MemberData } from '../../../model/member-data';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  constructor(
    private appComponent: AppComponent,
    private angularFirestore: AngularFirestore,
    private teamsProjectsValidationService: TeamsProjectsValidationService
  ) { }

  memberData = {} as MemberData;

  ngOnInit() {}

  async addMember(memberData: MemberData) {
    if (this.teamsProjectsValidationService.checkIfMemberFieldsAreNotEmpty(this.memberData.nameAndSurname,
      this.memberData.organizationRole, this.memberData.email, this.memberData.phone, this.memberData.room, this.memberData.teamName)
        && this.teamsProjectsValidationService.checkIfEmailAndPhoneIsValid(this.memberData.email, this.memberData.phone)) {

      this.appComponent.createLoadingDialog();
      this.appComponent.showLoadingDialog();

      try {
        var currentUser = firebase.auth().currentUser;
        await this.angularFirestore.collection('users').doc(currentUser.uid).collection('members').add(memberData);

        this.appComponent.showAlertDialogWithOkButton('Dodano członka zespołu', 'Pomyślnie dodano członka zespołu');
        this.clearInputFields();
      }
      catch (error) {
        this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby dodania członka zespołu');
      }
      this.appComponent.hideLoadingDialog();
    }
  }

  clearInputFields() {
    const emptyValue = null;
    this.memberData.nameAndSurname = emptyValue;
    this.memberData.organizationRole = emptyValue;
    this.memberData.email = emptyValue;
    this.memberData.phone = emptyValue;
    this.memberData.room = emptyValue;
    this.memberData.teamName = emptyValue;
  }
}
