import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskData } from '../../../model/task-data';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.page.html',
  styleUrls: ['./task-details.page.scss'],
})
export class TaskDetailsPage implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private navController: NavController
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
    switch (this.taskData.category.valueOf()) {
      case 'Analitycy': {
        this.navController.navigateBack('analysts');
        break;
      }
      case 'Zespół deweloperski': {
        this.navController.navigateBack('development-team');
        break;
      }
      case 'Product Owner': {
        this.navController.navigateBack('product-owner');
        break;
      }
      case 'Organizacja': {
        this.navController.navigateBack('company');
        break;
      }
      case 'Edukacja': {
        this.navController.navigateBack('education');
        break;
      }
      default: {
        this.navController.navigateBack('other-tasks');
        break;
      }
    }
  }
}

