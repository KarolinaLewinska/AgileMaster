import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/authentication/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./pages/authentication/sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./pages/authentication/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'reset-passwd-confirm',
    loadChildren: () => import('./pages/authentication/reset-passwd-confirm/reset-passwd-confirm.module').then( m => m.ResetPasswdConfirmPageModule)
  },
  {
    path: 'tasks-categories',
    loadChildren: () => import('./pages/tasks/tasks-categories/tasks-categories.module').then( m => m.TasksCategoriesPageModule)
  },
  {
    path: 'sign-up-confirm',
    loadChildren: () => import('./pages/authentication/sign-up-confirm/sign-up-confirm.module').then( m => m.SignUpConfirmPageModule)
  },
  {
    path: 'events-categories',
    loadChildren: () => import('./pages/events/events-categories/events-categories.module').then( m => m.EventsCategoriesPageModule)
  },
  {
    path: 'teams-projects-list',
    loadChildren: () => import('./pages/teams-projects/teams-projects-list/teams-projects-list.module').then( m => m.TeamsProjectsListPageModule)
  },
  {
    path: 'statistics-categories',
    loadChildren: () => import('./pages/statistics/statistics-categories/statistics-categories.module').then( m => m.StatisticsCategoriesPageModule)
  },
  {
    path: 'account-settings',
    loadChildren: () => import('./pages/account/account-settings/account-settings.module').then( m => m.AccountSettingsPageModule)
  },
  {
    path: 'update-email',
    loadChildren: () => import('./pages/account/update-email/update-email.module').then( m => m.UpdateEmailPageModule)
  },
  {
    path: 'update-passwd',
    loadChildren: () => import('./pages/account/update-passwd/update-passwd.module').then( m => m.UpdatePasswdPageModule)
  },
  {
    path: 'delete-account',
    loadChildren: () => import('./pages/account/delete-account/delete-account.module').then( m => m.DeleteAccountPageModule)
  },
  {
    path: 'analysts',
    loadChildren: () => import('./pages/tasks/analysts/analysts.module').then( m => m.AnalystsPageModule)
  },
  {
    path: 'development-team',
    loadChildren: () => import('./pages/tasks/development-team/development-team.module').then( m => m.DevelopmentTeamPageModule)
  },
  {
    path: 'product-owner',
    loadChildren: () => import('./pages/tasks/product-owner/product-owner.module').then( m => m.ProductOwnerPageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./pages/tasks/company/company.module').then( m => m.CompanyPageModule)
  },
  {
    path: 'education',
    loadChildren: () => import('./pages/tasks/education/education.module').then( m => m.EducationPageModule)
  },
  {
    path: 'other-tasks',
    loadChildren: () => import('./pages/tasks/other-tasks/other-tasks.module').then( m => m.OtherTasksPageModule)
  },
  {
    path: 'add-task',
    loadChildren: () => import('./pages/tasks/add-task/add-task.module').then( m => m.AddTaskPageModule)
  },
  {
    path: 'scrum-meetings',
    loadChildren: () => import('./pages/events/scrum-meetings/scrum-meetings.module').then( m => m.ScrumMeetingsPageModule)
  },
  {
    path: 'workshops',
    loadChildren: () => import('./pages/events/workshops/workshops.module').then( m => m.WorkshopsPageModule)
  },
  {
    path: 'courses',
    loadChildren: () => import('./pages/events/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'other-events',
    loadChildren: () => import('./pages/events/other-events/other-events.module').then( m => m.OtherEventsPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./pages/events/add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'edit-task/:id/:category',
    loadChildren: () => import('./pages/tasks/edit-task/edit-task.module').then( m => m.EditTaskPageModule)
  },
  {
    path: 'task-details',
    loadChildren: () => import('./pages/tasks/task-details/task-details.module').then( m => m.TaskDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
