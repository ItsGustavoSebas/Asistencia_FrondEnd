import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultadesupdateComponent } from './facultadesupdate.component';

describe('FacultadesupdateComponent', () => {
  let component: FacultadesupdateComponent;
  let fixture: ComponentFixture<FacultadesupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultadesupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FacultadesupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
