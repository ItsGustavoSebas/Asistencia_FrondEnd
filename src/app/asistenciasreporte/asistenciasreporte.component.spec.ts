import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasreporteComponent } from './asistenciasreporte.component';

describe('AsistenciasreporteComponent', () => {
  let component: AsistenciasreporteComponent;
  let fixture: ComponentFixture<AsistenciasreporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasreporteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciasreporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
