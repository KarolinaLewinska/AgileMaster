import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskData } from '../../../model/task-data';
import { SharedService } from '../../../services/shared-service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private sharedService: SharedService
  ) { }
  
  taskData = {} as TaskData;

  ngOnInit() {
    this.displayTaskDetails();
  }

  displayTaskDetails() {
    this.activatedRoute.queryParams.subscribe(params => {
    this.taskData = params['taskData']
    });
  }

  navigateBackFromDetailsToList() {
    this.sharedService.navigateBackToTasksList(this.taskData.category.valueOf())
  }
}

