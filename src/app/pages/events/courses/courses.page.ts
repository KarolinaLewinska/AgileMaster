import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
import { AppComponent } from '../../../app.component';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit {

  constructor(
    private angularFirestore: AngularFirestore,
    private appComponent: AppComponent,
    private sharedService: SharedService) { }

  eventsData: any;
  currentUser = firebase.auth().currentUser;
  nameOfEventsCategory = 'courses';

  ngOnInit() {
    this.showEventsList();
  }

  async showEventsList() {
    this.appComponent.createLoadingDialog();
    this.appComponent.showLoadingDialog();

    try {
      this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('events').doc('category')
        .collection(this.nameOfEventsCategory, events => events.orderBy('date')).snapshotChanges()
          .subscribe(eventsMapper => {
            this.eventsData = eventsMapper.map(mapper => {
              return {
                id: mapper.payload.doc.id,
                name: mapper.payload.doc.data()['name'],
                description: mapper.payload.doc.data()['description'],
                date: mapper.payload.doc.data()['date'].split('T')[0],
                startTime: mapper.payload.doc.data()['startTime'].split('T')[1].substring(0,5),
                duration: mapper.payload.doc.data()['duration'].split('T')[1].substring(0,5),
                place: mapper.payload.doc.data()['place'],
                category: mapper.payload.doc.data()['category']
              }
            })
          });
    }
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby wyświetlenia spotkań');
    }
  }

  async deleteEvent(id) {
    var wantsToDelete = true;
    if (wantsToDelete) {
      const dialog = await this.appComponent.createAndShowAlertDialogWithConfirmAndCancelButtons('Usuń spotkanie', 'Czy na pewno chcesz usunąć?');
      if (!dialog) {
        return;
      }
    }

    try {
      await this.angularFirestore.collection('users').doc(this.currentUser.uid).collection('events')
        .doc('category').collection(this.nameOfEventsCategory).doc(id).delete();
      this.appComponent.showAlertDialogWithOkButton('Usunięto spotkanie', 'Pomyślnie usunięto spotkanie');
    }
    catch (error) {
      this.appComponent.showAlertDialogWithOkButton('Błąd uwierzytelniania', 'Wystąpił błąd podczas próby usunięcia spotkania');
    }
  }

  navigateToEventDetails(eventDetails) {
    this.sharedService.navigateToEventDetails(eventDetails);
  }
}
