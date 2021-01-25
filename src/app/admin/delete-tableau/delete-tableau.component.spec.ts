import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTableauComponent } from './delete-tableau.component';

describe('DeleteTableauComponent', () => {
  let component: DeleteTableauComponent;
  let fixture: ComponentFixture<DeleteTableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
