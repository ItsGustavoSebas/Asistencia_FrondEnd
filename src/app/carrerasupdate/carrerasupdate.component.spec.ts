import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerasupdateComponent } from './carrerasupdate.component';

describe('CarrerasupdateComponent', () => {
  let component: CarrerasupdateComponent;
  let fixture: ComponentFixture<CarrerasupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerasupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrerasupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
