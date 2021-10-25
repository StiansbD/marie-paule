import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PortfolioService } from '../../services/portfolio.service';
import { Tableaux } from '../../models/tableaux.model';

@Component({
  selector: 'app-add-tableau',
  templateUrl: './add-tableau.component.html',
  styleUrls: ['./add-tableau.component.scss']
})
export class AddTableauComponent implements OnInit {

  createTableauForm: FormGroup;
  errorMessage: string;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(
    private formBuilder: FormBuilder,
    private portfolioService: PortfolioService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.createTableauForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      date: ['', [Validators.required]],
      vendre: ['', [Validators.required]],
      prix: [''],
      hauteur: ['', [Validators.required]],
      largeur: ['', [Validators.required]],
      categorie: ['']
    });
  }

  onSubmit() {
    const author = 0;
    const titre = this.createTableauForm.get('titre').value;
    const date = Date.now();
    const description = this.createTableauForm.get('description').value;
    const date_rea = this.createTableauForm.get('date').value;
    const vendre = this.createTableauForm.get('vendre').value;
    const prix = this.createTableauForm.get('prix').value || 0;
    const hauteur = this.createTableauForm.get('hauteur').value;
    const largeur = this.createTableauForm.get('largeur').value;
    const categorie = this.createTableauForm.get('categorie').value || "0";

    const newTableau = new Tableaux(author, titre, date, description, date_rea, vendre, prix, hauteur, largeur, categorie);

    if (this.fileUrl && this.fileUrl !== "") {
      newTableau.image = this.fileUrl;
    }

    this.portfolioService.createNewTableau(newTableau);
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.portfolioService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }
}
