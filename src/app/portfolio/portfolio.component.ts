import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../services/portfolio.service';
import { Tableaux } from '../models/tableaux.model';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  tableaux: Tableaux[];

  tableauxSubscription: Subscription;

  constructor(
    private portfolioService: PortfolioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableauxSubscription = this.portfolioService.tableauxSubject.subscribe(
      (tableaux: Tableaux[]) => {
        this.tableaux = tableaux;
      }
    );
    this.portfolioService.emitPortfolio();
  }

  onViewTableau(id: number) {
    this.router.navigate(['/portfolio', id]);
  }

}
