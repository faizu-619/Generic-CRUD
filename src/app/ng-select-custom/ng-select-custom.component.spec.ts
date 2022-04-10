import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSelectCustomComponent } from './ng-select-custom.component';

describe('NgSelectCustomComponent', () => {
  let component: NgSelectCustomComponent;
  let fixture: ComponentFixture<NgSelectCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgSelectCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSelectCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
