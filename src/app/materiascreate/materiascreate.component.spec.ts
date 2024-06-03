import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriascreateComponent } from './materiascreate.component';

describe('MateriascreateComponent', () => {
  let component: MateriascreateComponent;
  let fixture: ComponentFixture<MateriascreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriascreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriascreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
