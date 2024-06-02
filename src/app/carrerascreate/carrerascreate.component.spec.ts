import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrerascreateComponent } from './carrerascreate.component';

describe('CarrerascreateComponent', () => {
  let component: CarrerascreateComponent;
  let fixture: ComponentFixture<CarrerascreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrerascreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrerascreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
