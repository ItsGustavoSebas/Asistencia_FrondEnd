import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasDetallesCarrComponent } from './asistencias-detalles-carr.component';

describe('AsistenciasDetallesCarrComponent', () => {
  let component: AsistenciasDetallesCarrComponent;
  let fixture: ComponentFixture<AsistenciasDetallesCarrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasDetallesCarrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciasDetallesCarrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
