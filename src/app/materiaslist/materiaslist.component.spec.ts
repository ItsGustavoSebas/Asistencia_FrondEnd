import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriaslistComponent } from './materiaslist.component';

describe('MateriaslistComponent', () => {
  let component: MateriaslistComponent;
  let fixture: ComponentFixture<MateriaslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriaslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriaslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
