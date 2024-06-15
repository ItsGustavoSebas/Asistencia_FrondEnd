import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasReporteCarrComponent } from './asistencias-reporte-carr.component';

describe('AsistenciasReporteCarrComponent', () => {
  let component: AsistenciasReporteCarrComponent;
  let fixture: ComponentFixture<AsistenciasReporteCarrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasReporteCarrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciasReporteCarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
