import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionesListComponent } from './gestiones-list.component';

describe('GestionesListComponent', () => {
  let component: GestionesListComponent;
  let fixture: ComponentFixture<GestionesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
