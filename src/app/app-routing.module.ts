import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';
import { ConnexionComponent } from './admin/connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SingleTableauComponent } from './portfolio/single-tableau/single-tableau.component';
import { AddTableauComponent } from './admin/add-tableau/add-tableau.component';

const routes: Routes = [
  { path: "portfolio/:id", component: SingleTableauComponent },
  { path: "portfolio", component: PortfolioComponent },
  { path: "home", component: HomeComponent },
  { path: "admin/connexion", component: ConnexionComponent },
  { path: "admin/add-tableau", canActivate: [AuthGuardService], component: AddTableauComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
