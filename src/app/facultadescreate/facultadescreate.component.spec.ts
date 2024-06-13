import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadescreateComponent } from './facultadescreate.component';

describe('FacultadescreateComponent', () => {
  let component: FacultadescreateComponent;
  let fixture: ComponentFixture<FacultadescreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultadescreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultadescreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
