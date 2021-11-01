import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})

export class UserAuthenticationService {
  private dataOfUser: any;
  public isLoggedIn: boolean;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public navController: NavController) {
      this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.dataOfUser = user;
        localStorage.setItem('user', JSON.stringify(this.dataOfUser));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  
  signInWithEmailAndPassword(email, password) {
    this.isLoggedIn = true;
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then((result) => {
      this.router.navigate(['tasks']);
    });
  }

  signUpWithEmailAndPassword(email, password) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password)
    .then((result) => {
      this.navController.navigateBack('sign-up-confirm');
    });
  }

  checkIfUserIsLoggedIn() {
    if (this.isLoggedIn == true) {
      return true;
    }
    return false;
  }
}