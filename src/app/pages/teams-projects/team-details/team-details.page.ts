import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamData } from '../../../model/team-data';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from '@firebase/app-compat';
@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.page.html',
  styleUrls: ['./team-details.page.scss'],
})
export class TeamDetailsPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private angularFirestore: AngularFirestore) { }

  teamData = {} as TeamData;
  membersData: any;
  currentUser = firebase.auth().currentUser;

  ngOnInit() {
    this.getMembersData();
    this.displayTeamDetails();
  }

  displayTeamDetails() {
    this.activatedRoute.queryParams.subscribe(params => {
    this.teamData = params['teamData']
    this.membersData = params['membersData']
    });
  }

  async getMembersData() {
    var currentUser = firebase.auth().currentUser;
    this.angularFirestore.collection('users').doc(currentUser.uid).collection('members')
      .snapshotChanges().subscribe(memberMapper => {
        this.membersData = memberMapper.map(mapper => {
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
  }
