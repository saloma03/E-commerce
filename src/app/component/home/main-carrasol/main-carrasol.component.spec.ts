import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCarrasolComponent } from './main-carrasol.component';

describe('MainCarrasolComponent', () => {
  let component: MainCarrasolComponent;
  let fixture: ComponentFixture<MainCarrasolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCarrasolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainCarrasolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
