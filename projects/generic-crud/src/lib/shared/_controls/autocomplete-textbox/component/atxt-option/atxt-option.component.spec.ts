import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AtxtOptionComponent } from './atxt-option.component';

describe('AtxtOptionComponent', () => {
  let component: AtxtOptionComponent;
  let fixture: ComponentFixture<AtxtOptionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AtxtOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtxtOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
