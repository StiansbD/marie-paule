import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../../services/portfolio.service';
import { Tableaux } from '../../models/tableaux.model';

import { CategorieService } from '../../services/categorie.service';
import { Categorie } from 'src/app/models/categorie.model';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-tableau',
  templateUrl: './delete-tableau.component.html',
  styleUrls: ['./delete-tableau.component.scss']
})
export class DeleteTableauComponent implements OnInit {

  tableaux: Tableaux[];
  tableauxSubscription: Subscription;

  categories: Categorie[];
  categoriesSubscription: Subscription;

  constructor(
    private portfolioService: PortfolioService,
    private categorieService: CategorieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableauxSubscription = this.portfolioService.tableauxSubject.subscribe(
      (tableaux: Tableaux[]) => {
        this.tableaux = tableaux;
      }
    );
    this.portfolioService.emitPortfolio();

    this.categoriesSubscription = this.categorieService.categoriesSubject.subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      }
    );
    this.categorieService.emitCategorie();
  }

  onClick(tableau: Tableaux): void {
    this.portfolioService.removeTableau(tableau);
  }
}
