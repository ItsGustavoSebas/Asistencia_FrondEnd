import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramacionesAcademicasComponent } from './programaciones-academicas.component';

describe('ProgramacionesAcademicasComponent', () => {
  let component: ProgramacionesAcademicasComponent;
  let fixture: ComponentFixture<ProgramacionesAcademicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramacionesAcademicasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProgramacionesAcademicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
