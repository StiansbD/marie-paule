import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTableauComponent } from './single-tableau.component';

describe('SingleTableauComponent', () => {
  let component: SingleTableauComponent;
  let fixture: ComponentFixture<SingleTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
