import { Injectable } from "@angular/core";
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private navController: NavController) {}

  setTaskCategoryName(category) {
    var nameOfCategory = "";

    switch (category) {
      case 'Analitycy':
        nameOfCategory = 'analysts';
        break;
      case 'Zespół deweloperski':
        nameOfCategory = 'developmentTeam';
        break;
      case 'Product Owner':
        nameOfCategory = 'productOwner';
        break;
      case 'Organizacja':
        nameOfCategory = 'company';
        break;
      case 'Edukacja':
        nameOfCategory = 'education';
        break;
      default:
        nameOfCategory = 'otherTasks';
        break;
    }
    return nameOfCategory;
  }

  setEventCategoryName(category) {
    var nameOfCategory = "";

    switch (category) {
      case 'Spotkania Scrumowe':
        nameOfCategory = 'scrumMeetings';
        break;
      case 'Szkolenia':
        nameOfCategory = 'courses';
        break;
      case 'Warsztaty':
        nameOfCategory = 'workshops';
        break;
      default:
        nameOfCategory = 'otherEvents';
        break;
    }
    return nameOfCategory;
  }

  navigateToEventDetails(details) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        eventData: details
      }
    };
    this.navController.navigateForward('event-details', navigationExtras);
  }

  navigateToTaskDetails(details) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        taskData: details
      }
    };
    this.navController.navigateForward('task-details', navigationExtras);
  }

  navigateToTeamDetails(details) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        teamData: details
      }
    };
    this.navController.navigateForward('team-details', navigationExtras);
  }

  navigateToProjectDetails(details) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        projectData: details
      }
    };
    this.navController.navigateForward('project-details', navigationExtras);
  }

  navigateBackToTasksList(data) {
    switch (data) {
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

   navigateBackToTaskCategory(category) {
    switch (category) {
      case 'analysts': {
        this.navController.navigateBack('analysts');
        break;
      }
      case 'developmentTeam': {
        this.navController.navigateBack('development-team');
        break;
      }
      case 'productOwner': {
        this.navController.navigateBack('product-owner');
        break;
      }
      case 'company': {
        this.navController.navigateBack('company');
        break;
      }
      case 'education': {
        this.navController.navigateBack('education');
        break;
      }
      default: {
        this.navController.navigateBack('other-tasks');
        break;
      }
    }
  }

  navigateBackToEventsList(data) {
    switch (data) {
      case 'Spotkania Scrumowe': { 
        this.navController.navigateBack('scrum-meetings');
        break;
      }
      case 'Szkolenia': {
        this.navController.navigateBack('courses');
        break;
      }
      case 'Warsztaty': {
        this.navController.navigateBack('workshops');
        break;
      }
      default: {
        this.navController.navigateBack('other-events');
        break;
      }
    }
  }
}