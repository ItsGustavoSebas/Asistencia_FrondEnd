import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedroleComponent } from './updatedrole.component';

describe('UpdatedroleComponent', () => {
  let component: UpdatedroleComponent;
  let fixture: ComponentFixture<UpdatedroleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatedroleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatedroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
