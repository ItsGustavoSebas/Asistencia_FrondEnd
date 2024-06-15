import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasReporteFacComponent } from './asistencias-reporte-fac.component';

describe('AsistenciasReporteFacComponent', () => {
  let component: AsistenciasReporteFacComponent;
  let fixture: ComponentFixture<AsistenciasReporteFacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasReporteFacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciasReporteFacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
