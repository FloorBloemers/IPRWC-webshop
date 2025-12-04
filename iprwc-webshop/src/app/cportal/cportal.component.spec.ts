import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CportalComponent } from './cportal.component';

describe('CportalComponent', () => {
  let component: CportalComponent;
  let fixture: ComponentFixture<CportalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CportalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CportalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
