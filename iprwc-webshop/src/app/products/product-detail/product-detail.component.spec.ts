import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productDetailComponent } from './product-detail.component';

describe('productDetailComponent', () => {
  let component: productDetailComponent;
  let fixture: ComponentFixture<productDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [productDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(productDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
