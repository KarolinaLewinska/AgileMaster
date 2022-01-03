import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberData } from '../../../model/member-data';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.page.html',
  styleUrls: ['./member-details.page.scss'],
})
export class MemberDetailsPage implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) { }

  memberData = {} as MemberData;

  ngOnInit() {
    this.displayMemberDetails();
  }

  displayMemberDetails() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.memberData = params['memberData']
    });
  }
}
