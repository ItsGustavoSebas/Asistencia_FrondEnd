import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarreraslistComponent } from './carreraslist.component';

describe('CarreraslistComponent', () => {
  let component: CarreraslistComponent;
  let fixture: ComponentFixture<CarreraslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarreraslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarreraslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
