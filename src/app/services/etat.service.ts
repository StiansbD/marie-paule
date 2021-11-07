import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Etat } from '../models/etat.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  etat: Etat[] = [];
  etatsSubject = new Subject<Etat[]>();

  constructor() { 
    this.getEtat();
  }

  emitEtat() {
    this.etatsSubject.next(this.etat);
  }

  saveEtat() {
    firebase.database().ref('/categorie').set(this.etat);
  }

  getEtat() {
    firebase.database().ref('/etat')
    .on('value', (data: firebase.database.DataSnapshot) => {
      this.etat = data.val() ? data.val(): [];
      this.emitEtat();
    });
  }

  getSingleEtat(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/etat/' + id).once('value').then(
          (data: firebase.database.DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            console.error(error);
            reject(error);
          }
        );
      }
    );
  }

  createNewEtat(newEtat: Etat) {
    this.etat.push(newEtat);
    this.saveEtat();
    this.emitEtat();
  }

  removeEtat(etat: Etat) {
  }
}
