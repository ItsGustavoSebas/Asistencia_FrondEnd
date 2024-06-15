import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasDetallesFacComponent } from './asistencias-detalles-fac.component';

describe('AsistenciasDetallesFacComponent', () => {
  let component: AsistenciasDetallesFacComponent;
  let fixture: ComponentFixture<AsistenciasDetallesFacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasDetallesFacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciasDetallesFacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
