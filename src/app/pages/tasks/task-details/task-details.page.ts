import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { TaskData } from '../../../model/task-data';
import { TasksService } from '../../../services/tasks-service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private angularFireAuth: AngularFireAuth,
    private tasksService: TasksService) { }
  taskData = {} as TaskData;

  ngOnInit() {
    // this.displayTaskDetails();
  }

  // navigateToTaskDetails(taskData) {
  //   this.tasksService.navigateToDetails(this.taskData, 'task-details');
  // }

  // displayTaskDetails() {
  //   this.activatedRoute.queryParams.subscribe(params => {
  //       this.tasksService = params['taskData']
  // });}
}

