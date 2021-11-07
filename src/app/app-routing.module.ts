import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../app/services/auth-guard.service';
import { ConnexionComponent } from './admin/connexion/connexion.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SingleTableauComponent } from './portfolio/single-tableau/single-tableau.component';
import { AddTableauComponent } from './admin/add-tableau/add-tableau.component';
import { EditTableauComponent } from './admin/edit-tableau/edit-tableau.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { EditSingleTableauComponent } from './admin/edit-tableau/edit-single-tableau/edit-single-tableau.component';

const routes: Routes = [
  { path: "portfolio/:id", component: SingleTableauComponent },
  { path: "portfolio", component: PortfolioComponent },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "contact", component: ContactComponent },
  { path: "admin/login", component: ConnexionComponent },
  { path: "admin/add", canActivate: [AuthGuardService], component: AddTableauComponent },
  { path: "admin/edit", canActivate: [AuthGuardService], component:  EditTableauComponent},
  { path: "admin/edit/:id", canActivate: [AuthGuardService], component: EditSingleTableauComponent },
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "**", redirectTo: "home" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
