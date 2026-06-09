import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericCrudBootstrapComponent } from './generic-crud-bootstrap.component';

describe('GenericCrudBootstrapComponent', () => {
  let component: GenericCrudBootstrapComponent;
  let fixture: ComponentFixture<GenericCrudBootstrapComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericCrudBootstrapComponent]
    });
    fixture = TestBed.createComponent(GenericCrudBootstrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
