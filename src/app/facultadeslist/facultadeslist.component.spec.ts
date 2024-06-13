import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadeslistComponent } from './facultadeslist.component';

describe('FacultadeslistComponent', () => {
  let component: FacultadeslistComponent;
  let fixture: ComponentFixture<FacultadeslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultadeslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultadeslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
