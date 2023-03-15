import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input() n: number;
  @Input() max: number;
  @Input() c: number;

  nb: number;
  nb_page: number[];
  p_active: number;

  constructor() {
  }

  ngOnInit(): void {
    this.nb = Math.ceil(this.max/this.n);
    this.nb_page = Array(this.nb).fill(4).map((x,i)=>i+1);
    this.p_active = Math.ceil(this.c/this.n);
  }

  pageActive() {
  }

}
