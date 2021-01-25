import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTableauComponent } from './add-tableau.component';

describe('AddTableauComponent', () => {
  let component: AddTableauComponent;
  let fixture: ComponentFixture<AddTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
