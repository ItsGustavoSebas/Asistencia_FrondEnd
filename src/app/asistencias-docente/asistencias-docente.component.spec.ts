import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasDocenteComponent } from './asistencias-docente.component';

describe('AsistenciasDocenteComponent', () => {
  let component: AsistenciasDocenteComponent;
  let fixture: ComponentFixture<AsistenciasDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasDocenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciasDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
