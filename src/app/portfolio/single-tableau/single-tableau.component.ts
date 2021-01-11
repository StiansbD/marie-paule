import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tableaux } from 'src/app/models/tableaux.model';
import { PortfolioService } from 'src/app/services/portfolio.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-single-tableau',
  templateUrl: './single-tableau.component.html',
  styleUrls: ['./single-tableau.component.scss']
})
export class SingleTableauComponent implements OnInit {

  tableau: Tableaux;
  tableauID: number;
  tableauSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private location: Location,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    }

    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
      }
    });

  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.tableauSubscription = this.portfolioService.tableauxSubject.subscribe(
      (tableaux: Tableaux[]) => {
        this.tableau = tableaux[id];
      }
    );
    this.portfolioService.emitPortfolio();
  }

  onBack() {
    this.location.back();
  }

}
