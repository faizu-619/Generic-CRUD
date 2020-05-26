import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicButtonsComponent } from './dynamic-buttons.component';

describe('DynamicButtonsComponent', () => {
  let component: DynamicButtonsComponent;
  let fixture: ComponentFixture<DynamicButtonsComponent>;

  beforeEach(async(() => {
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
