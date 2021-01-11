import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Tableaux } from '../models/tableaux.model';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  tableaux: Tableaux[] = [];
  tableauxSubject = new Subject<Tableaux[]>();

  constructor() { 
    this.getPortfolio();
  }

  emitPortfolio() {
    this.tableauxSubject.next(this.tableaux);
  }

  savePortfolio() {
    firebase.database().ref('/tableaux').set(this.tableaux);
  }

  getPortfolio() {
    firebase.database().ref('/tableaux')
    .on('value', (data: firebase.database.DataSnapshot) => {
      this.tableaux = data.val() ? data.val(): [];
      this.emitPortfolio();
    });
  }

  getSingleTableau(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/tableaux/' + id).once('value').then(
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

  createNewTableau(newTableau: Tableaux) {
    this.tableaux.push(newTableau);
    this.savePortfolio();
    this.emitPortfolio();
  }

  removeTableau(tableau: Tableaux) {
    if (tableau.image) {
      const storageRef = firebase.storage().refFromURL(tableau.image);
      storageRef.delete().then(
        () => {
          console.log("Tableau supprimé avec succés :D");
        },
        (error) => {
          console.log("Le tableau n'a pas pu être supprimé :/");
          console.error(error);
        }
      );
    }

    const tableauIndexToRemove = this.tableaux.findIndex(
      (tableauE1) => {
        if (tableauE1 === tableau) {
          return true;
        }
      }
    );

    this.tableaux.splice(tableauIndexToRemove, 1);
    this.savePortfolio();
    this.emitPortfolio();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref().child('files/' + almostUniqueFileName + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Upload en cours....');
          },
          (error) => {
            console.error("Erreur ! L'upload a échoué...");
            console.error(error);
            reject();
          },
          () => {
            console.log('Upload est terminé ! :D');
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
