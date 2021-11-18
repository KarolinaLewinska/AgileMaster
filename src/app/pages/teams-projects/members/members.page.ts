import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { AppComponent } from '../../../app.component';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-members',
  templateUrl: './members.page.html',
  styleUrls: ['./members.page.scss'],
})
export class MembersPage implements OnInit {

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private sharedService: SharedService) { }

  membersData: any;
  currentUser = firebase.auth().currentUser;

  ngOnInit() {
    this.showMembersList();
  }

  async showMembersList() {
    
    

    try {
      var currentUser = firebase.auth().currentUser;
      this.angularFirestore.collection('users').doc(currentUser.uid)
        .collection('members', members => members.orderBy('nameAndSurname')).snapshotChanges()
          .subscribe(membersMapper => {
            this.membersData = membersMapper.map(mapper => {
              return {
                id: mapper.payload.doc.id,
                nameAndSurname: mapper.payload.doc.data()['nameAndSurname'],
                organizationRole: mapper.payload.doc.data()['organizationRole'],
                email: mapper.payload.doc.data()['email'],
                phone: mapper.payload.doc.data()['phone'],
                room: mapper.payload.doc.data()['room'],
                teamName: mapper.payload.doc.data()['teamName']
              }
            })
          });
    }
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby wyświetlenia członków zespołów');
    }
    
  }

  async deleteMember(id) {
    var wantsToDelete = true;

    if (wantsToDelete) {
      const dialog = await this.appComponent.createAndShowAlertDialogWithConfirmAndCancelButtons('Usuń członka zespołu', 'Czy na pewno chcesz usunąć?');
      if (!dialog) {
        return;
      }
    }

    try {
      await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('members').doc(id).delete();
      this.appComponent.showAlertDialogWithOkButton('Usunięto członka zespołu', 'Pomyślnie usunięto');
    }
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby usunięcia członka zespołu');
    }
  }

  navigateToMemberDetails(memberDetails) {
    this.sharedService.navigateToMemberDetails(memberDetails);
  }
}
