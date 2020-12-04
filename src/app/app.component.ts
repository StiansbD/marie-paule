import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'marie-paule';

  private firebaseConfig = {
    apiKey: "AIzaSyAJLYAMsSA90ELK3zxZRDVLySyJpUlMRWk",
    authDomain: "marie-paule-site.firebaseapp.com",
    projectId: "marie-paule-site",
    storageBucket: "marie-paule-site.appspot.com",
    messagingSenderId: "486103791733",
    appId: "1:486103791733:web:1302c9aa43ff18fcb2a03c",
    measurementId: "G-XX7E28HRJS"
  };
  
  constructor() {
    firebase.initializeApp(this.firebaseConfig);
    firebase.analytics();
  }
}
