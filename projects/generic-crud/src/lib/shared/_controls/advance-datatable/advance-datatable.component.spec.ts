import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdvanceDatatableComponent } from './advance-datatable.component';

describe('AdvanceDatatableComponent', () => {
  let component: AdvanceDatatableComponent;
  let fixture: ComponentFixture<AdvanceDatatableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
