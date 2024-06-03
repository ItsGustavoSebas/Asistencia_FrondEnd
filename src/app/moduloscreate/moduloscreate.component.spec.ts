import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloscreateComponent } from './moduloscreate.component';

describe('ModuloscreateComponent', () => {
  let component: ModuloscreateComponent;
  let fixture: ComponentFixture<ModuloscreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloscreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloscreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
