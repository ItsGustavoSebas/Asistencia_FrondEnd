import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenciaslistComponent } from './licenciaslist.component';

describe('LicenciaslistComponent', () => {
  let component: LicenciaslistComponent;
  let fixture: ComponentFixture<LicenciaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenciaslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LicenciaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
