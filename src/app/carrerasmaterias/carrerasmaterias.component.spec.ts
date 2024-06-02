import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasmateriasComponent } from './carrerasmaterias.component';

describe('CarrerasmateriasComponent', () => {
  let component: CarrerasmateriasComponent;
  let fixture: ComponentFixture<CarrerasmateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerasmateriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrerasmateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
