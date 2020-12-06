import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicButtonsComponent } from './dynamic-buttons.component';

describe('DynamicButtonsComponent', () => {
  let component: DynamicButtonsComponent;
  let fixture: ComponentFixture<DynamicButtonsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
