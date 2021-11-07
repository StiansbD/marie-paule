import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PortfolioService } from '../../../services/portfolio.service';
import { Tableaux } from '../../../models/tableaux.model';

import { CategorieService } from '../../../services/categorie.service';
import { Categorie } from 'src/app/models/categorie.model';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-single-tableau',
  templateUrl: './edit-single-tableau.component.html',
  styleUrls: ['./edit-single-tableau.component.scss']
})
export class EditSingleTableauComponent implements OnInit {

  tableau: Tableaux;
  tableauID: number;
  tableauSubscription: Subscription;

  categories: Categorie[];
  categoriesSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private categorieService: CategorieService,
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
  }

  onBack(): void {
    this.router.navigate(['admin/edit-tableau']);
  }
}
