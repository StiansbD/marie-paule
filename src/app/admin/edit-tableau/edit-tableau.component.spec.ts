import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTableauComponent } from './edit-tableau.component';

describe('EditTableauComponent', () => {
  let component: EditTableauComponent;
  let fixture: ComponentFixture<EditTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
