import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModulosupdateComponent } from './modulosupdate.component';

describe('ModulosupdateComponent', () => {
  let component: ModulosupdateComponent;
  let fixture: ComponentFixture<ModulosupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModulosupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModulosupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
