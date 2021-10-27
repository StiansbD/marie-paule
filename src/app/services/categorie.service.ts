import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Categorie } from '../models/categorie.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  categories: Categorie[] = [];
  categoriesSubject = new Subject<Categorie[]>();

  constructor() { 
    this.getCategorie();
  }

  emitCategorie() {
    this.categoriesSubject.next(this.categories);
  }

  saveCategorie() {
    firebase.database().ref('/categorie').set(this.categories);
  }

  getCategorie() {
    firebase.database().ref('/categorie')
    .on('value', (data: firebase.database.DataSnapshot) => {
      this.categories = data.val() ? data.val(): [];
      this.emitCategorie();
    });
  }

  getSingleCategorie(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/categorie/' + id).once('value').then(
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

  createNewCategorie(newCategorie: Categorie) {
    this.categories.push(newCategorie);
    this.saveCategorie();
    this.emitCategorie();
  }

  removeCategorie(categorie: Categorie) {
  }
}
