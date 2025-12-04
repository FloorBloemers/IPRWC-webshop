import { ComponentFixture, TestBed } from '@angular/core/testing';

import { productEditComponent } from './product-edit.component';

describe('productEditComponent', () => {
  let component: productEditComponent;
  let fixture: ComponentFixture<productEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [productEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(productEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
