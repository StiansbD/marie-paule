import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSingleTableauComponent } from './edit-single-tableau.component';

describe('EditSingleTableauComponent', () => {
  let component: EditSingleTableauComponent;
  let fixture: ComponentFixture<EditSingleTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSingleTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSingleTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
