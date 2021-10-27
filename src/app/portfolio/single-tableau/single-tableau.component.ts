import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { Tableaux } from '../../models/tableaux.model';
import { PortfolioService } from '../../services/portfolio.service';

import { CategorieService } from '../../services/categorie.service';
import { Categorie } from '../../models/categorie.model';

@Component({
  selector: 'app-single-tableau',
  templateUrl: './single-tableau.component.html',
  styleUrls: ['./single-tableau.component.scss']
})
export class SingleTableauComponent implements OnInit {

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
  ) {}

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
    this.router.navigate(['portfolio']);
  }

  reverseImg(): void {
    document.getElementById('card').classList.toggle('reverse');
  }
}
