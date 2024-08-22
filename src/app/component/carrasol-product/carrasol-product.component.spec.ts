import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrasolProductComponent } from './carrasol-product.component';

describe('CarrasolProductComponent', () => {
  let component: CarrasolProductComponent;
  let fixture: ComponentFixture<CarrasolProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarrasolProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarrasolProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
