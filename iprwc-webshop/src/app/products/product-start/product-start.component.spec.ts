import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productStartComponent } from './product-start.component';

describe('productStartComponent', () => {
  let component: productStartComponent;
  let fixture: ComponentFixture<productStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [productStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(productStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
