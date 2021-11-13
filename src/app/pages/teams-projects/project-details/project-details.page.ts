import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectData } from '../../../model/project-data';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.page.html',
  styleUrls: ['./project-details.page.scss'],
})
export class ProjectDetailsPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  projectData = {} as ProjectData;

  ngOnInit() {
    this.displayProjectDetails();
  }

  displayProjectDetails() {
    this.activatedRoute.queryParams.subscribe(params => {
    this.projectData = params['projectData']
    });
  }
}
