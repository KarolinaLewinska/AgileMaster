import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {

  constructor(private menuController: MenuController) { }
  openMenu() {
    this.menuController.enable(true, 'navMenu');
    this.menuController.open('navMenu');
  }

  ngOnInit() {
  }

}
