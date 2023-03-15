import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ConnexionComponent } from './admin/connexion/connexion.component';
import { EditTableauComponent } from './admin/edit-tableau/edit-tableau.component';
import { EditSingleTableauComponent } from './admin/edit-tableau/edit-single-tableau/edit-single-tableau.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PortfolioService } from './services/portfolio.service';
import { SingleTableauComponent } from './portfolio/single-tableau/single-tableau.component';
import { AddTableauComponent } from './admin/add-tableau/add-tableau.component';
import { CategorieService } from './services/categorie.service';
import { EtatService } from './services/etat.service';
import { PaginationComponent } from './portfolio/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    PortfolioComponent,
    ConnexionComponent,
    SingleTableauComponent,
    EditSingleTableauComponent,
    AddTableauComponent,
    EditTableauComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    PortfolioService,
    CategorieService,
    EtatService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
