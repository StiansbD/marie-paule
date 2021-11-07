import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PortfolioService } from '../../services/portfolio.service';
import { Tableaux } from '../../models/tableaux.model';

import { CategorieService } from '../../services/categorie.service';
import { Categorie } from 'src/app/models/categorie.model';

import { EtatService } from '../../services/etat.service';
import { Etat } from 'src/app/models/etat.model';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-tableau',
  templateUrl: './add-tableau.component.html',
  styleUrls: ['./add-tableau.component.scss']
})
export class AddTableauComponent implements OnInit {

  createTableauForm: FormGroup;
  errorMessage: string;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  categories: Categorie[];
  categoriesSubscription: Subscription;

  etats: Etat[];
  etatsSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private categorieService: CategorieService,
    private etatService: EtatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.categoriesSubscription = this.categorieService.categoriesSubject.subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      }
    );
    this.categorieService.emitCategorie();

    this.etatsSubscription = this.etatService.etatsSubject.subscribe(
      (etats: Etat[]) => {
        this.etats = etats;
      }
    );
    this.etatService.emitEtat();
  }

  initForm() {
    this.createTableauForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: [''],
      image: ['', [Validators.required]],
      date: ['', [Validators.required]],
      prix: [''],
      hauteur: ['', [Validators.required]],
      largeur: ['', [Validators.required]],
      categorie: [''],
      etat: ['']
    });
  }

  onSubmit() {
    const author = 0;
    const titre = this.createTableauForm.get('titre').value;
    const date = Date.now();
    const description = this.createTableauForm.get('description').value || "";
    const date_rea = this.createTableauForm.get('date').value;
    const prix = this.createTableauForm.get('prix').value || 0;
    const hauteur = this.createTableauForm.get('hauteur').value;
    const largeur = this.createTableauForm.get('largeur').value;
    const categorie = Number(this.createTableauForm.get('categorie').value) || 0;
    const etat = Number(this.createTableauForm.get('etat').value) || 0;

    const newTableau = new Tableaux(author, titre, date, description, date_rea, prix, hauteur, largeur, categorie, etat);

    if (this.fileUrl && this.fileUrl !== "") {
      newTableau.image = this.fileUrl;
    }

    this.portfolioService.createNewTableau(newTableau);

    this.router.navigate(['portfolio']);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.portfolioService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  onCollapse() {
    const elem = document.getElementById('+');
    elem.classList.toggle('expanded');

    if (elem.className === 'expanded') {
      elem.innerHTML = "<span id=\"+\"><i class=\"ri-subtract-line\"></i></span>";
    } else {
      elem.innerHTML = "<span id=\"+\"><i class=\"ri-add-line\"></i></span>";
    }
  }
}
