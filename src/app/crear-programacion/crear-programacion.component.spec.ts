import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearProgramacionComponent } from './crear-programacion.component';

describe('CrearProgramacionComponent', () => {
  let component: CrearProgramacionComponent;
  let fixture: ComponentFixture<CrearProgramacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearProgramacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearProgramacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
