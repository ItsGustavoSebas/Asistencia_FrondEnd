import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasupdateComponent } from './materiasupdate.component';

describe('MateriasupdateComponent', () => {
  let component: MateriasupdateComponent;
  let fixture: ComponentFixture<MateriasupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriasupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
