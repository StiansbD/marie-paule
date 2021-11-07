import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../services/portfolio.service';
import { Tableaux } from '../models/tableaux.model';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  tableaux: Tableaux[];
  tableauxSubscription: Subscription;

  tableau1: Tableaux;
  tableau2: Tableaux;
  tableau3: Tableaux;

  constructor(
    private portfolioService: PortfolioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tableauxSubscription = this.portfolioService.tableauxSubject.subscribe(
      (tableaux: Tableaux[]) => {
        this.tableau1 = tableaux[tableaux.length-1];
        this.tableau2 = tableaux[tableaux.length-2];
        this.tableau3 = tableaux[tableaux.length-3];
        this.tableaux = tableaux;
      }
    );
    this.portfolioService.emitPortfolio();

    setTimeout(() => {
      document.getElementsByClassName('carousel-item')[0].classList.add('active');
    }, 2000);
  }

  openTableau(id): void {
    this.router.navigate(['portfolio/'+id]);
  }

  goPortfolio(): void {
    this.router.navigate(['portfolio']);
  }

  goAbout(): void {
    this.router.navigate(['about']);
  }

  toAdmin(): void {
    this.router.navigate(['admin/connexion']);
  }
}
