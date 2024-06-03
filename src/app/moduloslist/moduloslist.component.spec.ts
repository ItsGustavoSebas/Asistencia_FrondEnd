import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloslistComponent } from './moduloslist.component';

describe('ModuloslistComponent', () => {
  let component: ModuloslistComponent;
  let fixture: ComponentFixture<ModuloslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloslistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
