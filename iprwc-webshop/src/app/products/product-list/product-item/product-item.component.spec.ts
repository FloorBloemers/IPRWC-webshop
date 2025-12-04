import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productItemComponent } from './product-item.component';

describe('productItemComponent', () => {
  let component: productItemComponent;
  let fixture: ComponentFixture<productItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [productItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(productItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
