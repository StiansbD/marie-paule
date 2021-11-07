import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PortfolioService } from '../../../services/portfolio.service';
import { Tableaux } from '../../../models/tableaux.model';

import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from 'src/app/models/categorie.model';

import { EtatService } from '../../../services/etat.service';
import { Etat } from 'src/app/models/etat.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-single-tableau',
  templateUrl: './edit-single-tableau.component.html',
  styleUrls: ['./edit-single-tableau.component.scss']
})
export class EditSingleTableauComponent implements OnInit {

  createTableauForm: FormGroup;
  errorMessage: string;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  tableau: Tableaux;
  tableauID: number;
  tableauSubscription: Subscription;

  categories: Categorie[];
  categoriesSubscription: Subscription;
  
  etats: Etat[];
  etatsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService,
    private categorieService: CategorieService,
    private etatService: EtatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.tableauSubscription = this.portfolioService.tableauxSubject.subscribe(
      (tableaux: Tableaux[]) => {
        this.tableau = tableaux[id];
      }
    );
    this.portfolioService.emitPortfolio();

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
    
    this.initForm();
  }

  initForm() {
    this.createTableauForm = this.formBuilder.group({
      titre: [''],
      description: [''],
      image: [''],
      date: [''],
      prix: [''],
      hauteur: [''],
      largeur: [''],
      categorie: [''],
      etat: ['']
    });
  }

  onSubmit() {
    const author = 0;
    const titre = this.createTableauForm.get('titre').value || this.tableau.title;
    const date = Date.now();
    const description = this.createTableauForm.get('description').value || ( this.tableau.description || "" );
    const date_rea = this.createTableauForm.get('date').value || this.tableau.date_rea;
    const prix = this.createTableauForm.get('prix').value || ( this.tableau.price || 0 );
    const hauteur = this.createTableauForm.get('hauteur').value || this.tableau.height;
    const largeur = this.createTableauForm.get('largeur').value || this.tableau.length;
    const categorie = Number(this.createTableauForm.get('categorie').value) || ( this.tableau.categorie || 0 );
    const etat = Number(this.createTableauForm.get('etat').value) || ( this.tableau.etat || 0 );

    const newTableau = new Tableaux(author, titre, date, description, date_rea, prix, hauteur, largeur, categorie, etat);
    
    newTableau.image = this.tableau.image;

    this.portfolioService.removeTableau(this.tableau);
    this.portfolioService.createNewTableau(newTableau);

    this.router.navigate(['portfolio']);
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

  onBack(): void {
    this.router.navigate(['admin/edit-tableau']);
  }
}
